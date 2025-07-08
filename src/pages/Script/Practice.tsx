import styled from 'styled-components';
import ScriptSection from './components/ScriptSection';
import CloseButtonImg from '../../assets/png/daily-script-button.png';
import CloseButton from './components/CloseButton';
import Divider from './components/Divider';
import ActivityButtons from './components/ActivityButtons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from './components/Modal';
import { useLocation } from 'react-router-dom';
import getOneScript from '../../apis/getOneScript';
import RedText from './components/RedText';
import BlueText from './components/BlueText';

const PracticeStyle = styled.div`
  height: 100%;
  background-color: #a2caff;
  position: relative;
`;

const Practice = () => {
  // 대본 관련
  /** status 소개
   * --------------
   * 0: 녹음 전
   * 1: 녹음 중
   * 2: 녹음 종료/완료
   * 3: 분석 중
   * 4: 다음 문제/다시 연습
   * 5: 모든 문제 해결
   */
  const [status, setStatus] = useState<number>(0);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [problemNo, setProblemNo] = useState<number>(1);
  const [scripts, setScripts] = useState<string[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [curScript, setCurScript] = useState<React.ReactNode>();
  const location = useLocation();
  const paths = location.pathname.split('/');
  const scriptid = Number(paths[paths.length - 1]);
  const memberid = 2;

  // 오디오 및 웹소켓 관련
  const [isTalking, setIsTalking] = useState(false);
  const webSocket = useRef<WebSocket>(null);
  const stream = useRef<MediaStream>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const processor = useRef<AudioWorkletNode | null>(null);

  useEffect(() => {
    const getScript = async () => {
      try {
        const response = await getOneScript(scriptid);
        if (response.data.success) {
          return response.data.data.content;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    };

    const fetchAndSetScripts = async () => {
      const curScripts = [...scripts];
      if (location.state === null) {
        const newScript = await getScript();
        if (newScript) curScripts.push(newScript);
      } else {
        curScripts.push(location.state.content);
      }
      setScripts(curScripts);
      setCurScript(curScripts[problemNo - 1]);
    };

    fetchAndSetScripts();
  }, []);

  const handleRecordBtn = useCallback(() => {
    if (status === 0) {
      startRecognizingVoice();
    }
  }, [status]);

  const endRecognizingVoice = useCallback(() => {
    if (stream.current) {
      stream.current.getTracks().forEach(track => track.stop());
      stream.current = null;
    }
    if (processor.current) {
      processor.current.disconnect();
      processor.current = null;
    }
    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current = null;
    }
    if (webSocket.current) {
      webSocket.current.close();
      webSocket.current = null;
    }
    setStatus(0);
  }, []);

  const startRecognizingVoice = useCallback(() => {
    const start = async () => {
      endRecognizingVoice();
      console.log('107번째 줄에서 close가 발생했습니다!');
      webSocket.current = new WebSocket('ws://54.180.116.11:8080/ws/stt');

      webSocket.current.onopen = () => {
        webSocket.current?.send(
          JSON.stringify({
            type: 'AUTH',
            token: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            memberId: memberid,
            scriptId: scriptid,
          }),
        );
        setTimeout(async () => {
          try {
            const sampleRate = 16000;
            const chunkRate = 100;
            stream.current = await navigator.mediaDevices.getUserMedia({
              audio: {
                sampleRate: sampleRate,
                channelCount: 1,
              },
            });
            mediaRecorder.current = new MediaRecorder(stream.current);
            audioContext.current = new window.AudioContext({
              sampleRate: sampleRate,
            });
            const source = audioContext.current.createMediaStreamSource(stream.current);
            await audioContext.current.audioWorklet.addModule('/linear16-processor.js');

            processor.current = new AudioWorkletNode(audioContext.current, 'linear16-processor');
            processor.current.port.onmessage = event => {
              if (webSocket.current?.readyState === WebSocket.OPEN) {
                webSocket.current.send(event.data);
              }
            };

            const analyser = audioContext.current.createAnalyser();
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            source.connect(processor.current);
            processor.current.connect(audioContext.current.destination);
            source.connect(analyser);

            const detectTalking = () => {
              analyser.getByteFrequencyData(dataArray);
              const avgVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
              if (avgVolume >= 20) {
                setIsTalking(true);
              } else {
                setIsTalking(false);
              }
              requestAnimationFrame(detectTalking);
            };

            detectTalking();

            mediaRecorder.current.onstop = () => {
              if (processor.current && audioContext.current) {
                source.disconnect(processor.current);
                processor.current.disconnect(audioContext.current.destination);
              }
            };

            mediaRecorder.current.start(chunkRate);
            setStatus(1);
          } catch (error) {
            console.error(error);
            endRecognizingVoice();
            console.log('175번째 줄에서 close가 발생했습니다!');
            setStatus(0);
          }
        }, 300);
      };

      webSocket.current.onmessage = e => {
        try {
          const data = JSON.parse(e.data);
          console.log(data);
          if (data.type === 'AUTH_OK') {
            console.log('🔐 인증 성공');
          } else if (data.type === 'ERROR') {
            console.error(`❌ 오류: ${data.message}`);
            endRecognizingVoice();
            console.log('190번째 줄에서 close가 발생했습니다!');
          } else {
            if (data.final) {
              setStatus(2);
              setTimeout(() => {
                setStatus(3);
                setCurScript(
                  data.words.map((info: Record<string, string>, index: number) => {
                    let el = null;
                    if (info.word === '' && info.expected !== '') {
                      el = <RedText key={index}>{info.expected}</RedText>;
                    } else if (info.word === info.expected) {
                      el = <BlueText key={index}>{info.word}</BlueText>;
                    }
                    return el ? [el, ' '] : []; // 스팬 뒤에 공백 노드 하나
                  }),
                );
                setTimeout(() => {
                  setStatus(5);
                  setAccuracy(Math.floor(data.accuracy * 1000) / 10);
                  setCorrectCount(data.correctCount);
                  setTotalCount(data.totalCount);
                }, 5000);
              }, 3000);
              endRecognizingVoice();
              console.log('206번째 줄에서 close가 발생했습니다!');
            } else {
              console.log('전달받은 데이터 전체:', data);
              console.log('📩 인식 결과:', data.transcript);
            }
          }
        } catch (err) {
          console.warn('❌ 응답 처리 중 오류:', err);
          endRecognizingVoice();
          console.log('215번째 줄에서 close가 발생했습니다!');
        }
      };

      webSocket.current.onerror = e => {
        console.error('🚨 WebSocket 에러:', e);
        endRecognizingVoice();
        console.log('222번째 줄에서 close가 발생했습니다!');
      };

      webSocket.current.onclose = e => {
        console.log('websocket code:', e.code, ', wasClean:', e.wasClean);
        if (e.code !== 1000) {
          console.log('비정상적인 종료:', e.code);
        }
        console.log('🔌 WebSocket 연결 종료');
        endRecognizingVoice();
        console.log('232번째 줄에서 close가 발생했습니다!');
      };
    };
    start();
  }, []);

  return (
    <PracticeStyle>
      {isClosed && <Modal setIsClosed={setIsClosed} />}
      <CloseButton
        onClick={() => {
          setIsClosed(prev => !prev);
        }}
      >
        <img src={CloseButtonImg} alt="daily-scripts-page-close-button" width="18" height="18" />
      </CloseButton>
      <ScriptSection
        status={status}
        accuracy={accuracy}
        correctCount={correctCount}
        totalCount={totalCount}
        problemNo={problemNo}
        totalStep={scripts.length}
        script={curScript}
        path={paths[1]}
      />
      <Divider />
      <ActivityButtons
        status={status}
        setStatus={setStatus}
        isTalking={isTalking}
        totalStep={scripts.length}
        handleRecordBtn={handleRecordBtn}
        setProblemNo={setProblemNo}
      />
    </PracticeStyle>
  );
};

export default Practice;
