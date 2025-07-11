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
import SkyblueText from './components/SkyblueText';

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
  const [status, setStatus] = useState<number>(0); // 학습 진행 상태
  const [isClosed, setIsClosed] = useState<boolean>(false); // 대본 연습 창 닫기 버튼 클릭 확인
  const [step, setStep] = useState<number>(1); // 학습 대본 단계
  const [scripts, setScripts] = useState<string[]>([]); // 학습 진행 대본 목록(초기 진단 테스트: 5개, 데일리 대본 연습: 1개)
  const [curScript, setCurScript] = useState<React.ReactElement[]>([]);
  const curScriptRef = useRef<React.ReactElement[]>([]);
  const expectedWordsRef = useRef<React.ReactNode[]>([]); // 예상되는 단어들을 <SkyblueText> 컴포넌트로 감싸서 관리
  const wordsLengthRef = useRef<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0); // 학습 결과 - 정확도
  const [totalCount, setTotalCount] = useState<number>(0); // 학습 진행 - 총 단어 개수
  const [correctCount, setCorrectCount] = useState<number>(0); // 학습 진행 - 맞은 단어 개수
  const location = useLocation();
  const paths = location.pathname.split('/');
  const scriptid = Number(paths[paths.length - 1]);
  const memberid = 1;

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
      expectedWordsRef.current = curScripts[step - 1].split(' ');
      const expectedWords = curScripts[step - 1].split(' ').map((value: string, index: number) => {
        return <SkyblueText key={index}>{value}</SkyblueText>;
      });
      setCurScript(expectedWords);
    };

    fetchAndSetScripts();
  }, []);

  useEffect(() => {
    curScriptRef.current = curScript;
  }, [curScript]);

  const handleRecordBtn = useCallback(() => {
    if (status === 0) {
      startRecognizingVoice();
    } else if (status === 1) {
      console.log('녹음 종료 시도!');
      endRecognizingVoice();
      webSocket.current?.send(JSON.stringify({ type: 'END_SENTENCE' }));
      setStatus(2);
    }
  }, [status]);

  const endWebSocket = useCallback(() => {
    if (webSocket.current) {
      webSocket.current.close();
      webSocket.current = null;
    }
  }, []);

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
    setStatus(0);
  }, []);

  const startRecognizingVoice = useCallback(() => {
    const start = async () => {
      endRecognizingVoice();
      endWebSocket();
      console.log('107번째 줄에서 close가 발생했습니다!');
      webSocket.current = new WebSocket('ws://54.180.116.11:8080/ws/stt');

      webSocket.current.onopen = () => {
        webSocket.current?.send(
          JSON.stringify({
            type: 'AUTH',
            token: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            memberId: memberid,
            scriptId: scriptid,
            mode: 'NORMAL',
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
            endWebSocket();
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
            endWebSocket();
            console.log('190번째 줄에서 close가 발생했습니다!');
          } else if (data.type === 'INTERIM_FINAL') {
            console.log('💡 최종 인식 결과:', data.transcript)
          } else if (data.type === 'INTERIM') {
            console.log('📩 인식 결과:', data.transcript);
            const curWords = [...curScriptRef.current];
            const subwords = data.transcript.split(' ');
            if (subwords.length > wordsLengthRef.current) {
              for (let i = wordsLengthRef.current; i < subwords.length; i++) {
                curWords[i] = <BlueText key={i}>{expectedWordsRef.current[i]}</BlueText>;
              }
              curScriptRef.current = curWords;
              setCurScript(curScriptRef.current);
              wordsLengthRef.current = subwords.length;
            }
          } else if (data.type === 'FINAL_FLUSH') {
            console.log('good!');
            if (webSocket.current && webSocket.current.readyState === webSocket.current.OPEN) {
              console.log('녹음 종료! 결과 전송 중...');
              setTimeout(() => {
                webSocket.current?.close();
                webSocket.current = null;
                endWebSocket();
              }, 1000);
            }
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
              }, 4000);
            }, 3000);
            endRecognizingVoice();
            endWebSocket();
            console.log('206번째 줄에서 close가 발생했습니다!');
          } else {
            console.log("sibal");
          }
        } catch (err) {
          console.warn('❌ 응답 처리 중 오류:', err);
          endRecognizingVoice();
          endWebSocket();
          console.log('215번째 줄에서 close가 발생했습니다!');
        }
      };

      webSocket.current.onerror = e => {
        console.error('🚨 WebSocket 에러:', e);
        endRecognizingVoice();
        endWebSocket();
        console.log('222번째 줄에서 close가 발생했습니다!');
      };

      webSocket.current.onclose = e => {
        console.log('websocket code:', e.code, ', wasClean:', e.wasClean);
        if (e.code !== 1000) {
          console.log('비정상적인 종료:', e.code);
        }
        console.log('🔌 WebSocket 연결 종료');
        endRecognizingVoice();
        endWebSocket();
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
        step={step}
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
        setStep={setStep}
      />
    </PracticeStyle>
  );
};

export default Practice;
