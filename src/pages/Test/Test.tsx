import styled from 'styled-components';
import ScriptSection from './components/ScriptSection';
import CloseButtonImg from '../../assets/png/daily-script-button.png';
import CloseButton from './components/CloseButton';
import Divider from './components/Divider';
import ActivityButtons from './components/ActivityButtons';
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from './components/Modal';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import PracticeDescription from './components/PracticeDescription';
import Result from './components/Result';
import type { TestContext } from './types/TestContext';
import getLevelTestScripts from '../../apis/getLevelTestScripts';

const TestStyle = styled.div`
  height: 100%;
  background-color: #a2caff;
  position: relative;
`;

const Test = () => {
  // 대본 관련
  /** introStatus 소개
   * --------------
   * -1: 연습 시작. 대본이 렌더링
   * 0~2: 대본이 렌더링 되지 않음. 설명을 들으면서 다음으로 넘어가는 버튼 클릭 화면을 렌더링
   * 0: "안녕하세요!" 환영 인사
   * 1: "시작하기 전, 여러분이 어느 부분에서 어려워하는지 알아보고자 간단한 테스트를 해보려고 합니다!"
   * 2: "테스트 할 수 있도록 조용한 공간에서 시작해주시고 준비가 되었다면 아래 녹음하기 버튼을 눌러주세요!"
   */
  const [introStatus, setIntroStatus] = useState<number>(0);
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
  const [scripts, setScripts] = useState<React.ReactNode[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);
  const location = useLocation();
  const paths = location.pathname.split('/');
  const scriptid = Number(paths[paths.length - 1]);
  const memberid = 1;
  const navigate = useNavigate();

  // 오디오 및 웹소켓 관련
  const [isTalking, setIsTalking] = useState(false);
  const webSocket = useRef<WebSocket>(null);
  const stream = useRef<MediaStream>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const processor = useRef<AudioWorkletNode | null>(null);

  useEffect(() => {
    const curScripts = [...scripts];
    const getScripts = async () => {
      try {
        const response = await getLevelTestScripts();
        const data = response.data.data;
        console.log(data);
        // data.map((value: Record<string, string | number>) => {
        //   curScripts.push(value.content);
        // })
        curScripts.push(data.content);
        console.log(curScripts);
        setScripts(curScripts);
      } catch (error) {
        console.log(curScripts);
      }
    };
    getScripts();
  }, []);

  const handleRecordBtn = useCallback(() => {
    if (introStatus !== -1) {
      setIntroStatus(-1);
      return;
    }
    if (status === 0) {
      startRecognizingVoice();
    } else if (status === 1) {
      setStatus(2);
      setTimeout(() => {
        setProblemNo(prev => {
          if (prev === 2) {
            return 1;
          } else {
            setStatus(0);
            navigate(`/test/${prev + 1}`);
            return prev + 1;
          }
        });
      }, 2000);
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
      webSocket.current.send(JSON.stringify({ type: 'END_SENTENCE' }));
      setTimeout(() => webSocket.current?.close(), 300);
      webSocket.current = null;
    }
    setStatus(0);
  }, []);

  const startRecognizingVoice = useCallback(() => {
    const start = async () => {
      endRecognizingVoice();
      webSocket.current = new WebSocket('ws://54.180.116.11:8080/ws/stt');

      webSocket.current.onopen = () => {
        console.log(webSocket.current);
        webSocket.current?.send(
          JSON.stringify({
            type: 'AUTH',
            token: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            memberId: memberid,
            scriptId: scriptid,
            mode: 'LEVEL_TEST',
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
            setStatus(0);
          }
        }, 1000);
      };

      webSocket.current.onmessage = e => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'AUTH_OK') {
            console.log('🔐 인증 성공');
          } else if (data.type === 'ERROR') {
            console.error(`❌ 오류: ${data.message}`);
            endRecognizingVoice();
          } else {
            if (data.final) {
              setStatus(2);
              setTimeout(() => {
                setStatus(3);
                setTimeout(() => {
                  setStatus(4);
                  let sum = 0;
                  data.words.forEach((value: Record<string, string | number | boolean>) => {
                    sum += Number(value.isCorrect);
                  });
                  setAccuracy(sum / data.words.length);
                });
              }, 2000);
              endRecognizingVoice();
            } else {
              console.log('전달받은 데이터 전체:', data);
              console.log('📩 인식 결과:', data.transcript);
            }
          }
        } catch (err) {
          console.warn('❌ 응답 처리 중 오류:', err);
          endRecognizingVoice();
        }
      };

      webSocket.current.onerror = e => {
        console.error('🚨 WebSocket 에러:', e);
        endRecognizingVoice();
      };

      webSocket.current.onclose = () => {
        console.log('🔌 WebSocket 연결 종료');
        endRecognizingVoice();
      };
    };
    start();
  }, []);
  const contextValue: TestContext = {
    status,
    introStatus,
    setIntroStatus,
    script: scripts[problemNo - 1],
    problemNo,
  };
  return (
    <TestStyle>
      {isClosed && <Modal setIsClosed={setIsClosed} />}
      <CloseButton
        onClick={() => {
          setIsClosed(prev => !prev);
        }}
      >
        <img src={CloseButtonImg} alt="daily-scripts-page-close-button" width="18" height="18" />
      </CloseButton>
      <ScriptSection>
        <ProgressBar step={problemNo} totalStep={scripts.length} />
        <PracticeDescription introStatus={introStatus} status={status} />
        <Outlet context={contextValue} />
        {status === 4 && <Result accuracy={accuracy} />}
      </ScriptSection>
      <Divider />
      <ActivityButtons
        status={status}
        introStatus={introStatus}
        isTalking={isTalking}
        handleRecordBtn={handleRecordBtn}
      />
    </TestStyle>
  );
};

export default Test;
