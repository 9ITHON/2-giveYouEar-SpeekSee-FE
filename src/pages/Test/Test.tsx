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
import BlueText from '../Script/components/BlueText';
import { letsCheckSpokenWords } from '../Script/utils/letsCheckSpokenWords';
import type { MappedResult } from '../Script/types/MappedResult';
import RedText from '../Script/components/RedText';
import SkyblueText from '../Script/components/SkyblueText';

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
   * 4: 다음 화면으로 이동 텍스트
   * 5: 나가기 버튼 활성화
   */
  const [status, setStatus] = useState<number>(0);
  /**
   * outroStatus 소개
   * --------------
   * -1: 연습 시작, 연습 중
   * 0~2: 연습 완료
   * 0: 분석 중
   * 1: 결과 확인
   * 2: 나가기 버튼 활성화
   */
  const [outroStatus, setOutroStatus] = useState<number>(-1);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // 학습 대본 단계
  const [scripts, setScripts] = useState<React.ReactNode[]>([]);
  const [curScript, setCurScript] = useState<React.ReactElement[]>([]);
  const curScriptRef = useRef<React.ReactElement[]>([]);
  const expectedWordsRef = useRef<string[]>([]); // 예상되는 단어들을 <SkyblueText> 컴포넌트로 감싸서 관리
  const wordsLengthRef = useRef<number>(0);
  const checkIdxRef = useRef<number>(0);
  const totalCurScriptLength = useRef<number>(0);
  const [accuracies, setAccuracies] = useState<number[]>([0, 0, 0]);
  const [totalCounts, setTotalCounts] = useState<number[]>([0, 0, 0]); // 학습 진행 - 총 단어 개수
  const [correctCounts, setCorrectCounts] = useState<number[]>([0, 0, 0]); // 학습 진행 - 맞은 단어 개수
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

  // 1) 한 번만 데이터 가져오기
  useEffect(() => {
    (async () => {
      const data = await getLevelTestScripts()
        .then(res => (res.data.success ? res.data.data.content : null))
        .catch(err => {
          console.error(err);
          return null;
        });

      if (!data || data.length === 0) {
        console.warn('스크립트가 없습니다.');
        return;
      }

      // scripts 상태에 "문자열 배열"로 저장
      setScripts(data.map((item: any) => item.content as string));
    })();
  }, []);

  // 2) scripts 또는 step이 바뀔 때마다 curScript/expectedWords 계산
  useEffect(() => {
    // 안전하게 길이 확인
    if (scripts.length === 0 || step < 1 || step > scripts.length) {
      return;
    }

    const text = scripts[step - 1]; // 반드시 string
    const words = text.split(' '); // ["오늘의", "날씨는", "..."]

    expectedWordsRef.current = words;
    totalCurScriptLength.current = words.length;
    checkIdxRef.current = 0;

    setCurScript(words.map((w: string, i: number) => <SkyblueText key={i}>{w}</SkyblueText>));
  }, [scripts, step]);

  useEffect(() => {
    curScriptRef.current = curScript;
  }, [curScript]);

  const handleRecordBtn = useCallback(() => {
    if (introStatus !== -1) {
      setIntroStatus(-1);
      return;
    }
    if (status === 0) {
      startRecognizingVoice();
    } else if (status === 1) {
      console.log('녹음 종료 시도!');
      setStatus(2);
      endRecognizingVoice();
      webSocket.current?.send(JSON.stringify({ type: 'END_SENTENCE' }));
      setTimeout(() => {
        setStep(prev => {
          if (prev === 2) {
            setOutroStatus(0);
            navigate('/test/done');
            return 1;
          } else {
            setStatus(0);
            navigate(`/test/${prev + 1}`);
            return prev + 1;
          }
        });
      }, 3000);
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
            endWebSocket();
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
            console.log('💡 최종 인식 결과:', data.transcript);
            checkIdxRef.current += wordsLengthRef.current;
            wordsLengthRef.current = 0;
          } else if (data.type === 'INTERIM') {
            console.log('📩 인식 결과:', data.transcript);
            const curWords = [...curScriptRef.current];
            const subwords = data.transcript.split(' ');
            if (subwords.length > wordsLengthRef.current) {
              for (
                let i = wordsLengthRef.current + checkIdxRef.current;
                i < 39 && i < subwords.length + checkIdxRef.current;
                i++
              ) {
                curWords[i] = <BlueText key={i}>{expectedWordsRef.current[i]}</BlueText>;
              }
              curScriptRef.current = curWords;
              setCurScript(curScriptRef.current);
              wordsLengthRef.current = subwords.length;
            }
          } else if (data.type === 'FINAL_FLUSH') {
            if (webSocket.current && webSocket.current.readyState === webSocket.current.OPEN) {
              console.log('녹음 종료! 결과 전송 중...');
              setTimeout(() => {
                webSocket.current?.close();
                webSocket.current = null;
                endWebSocket();
              }, 2000);
            }
            setTimeout(() => {
              const words = letsCheckSpokenWords(data.words, expectedWordsRef.current);
              let correctWordsCount = 0;
              setCurScript(
                words.map((word: MappedResult, index: number) => {
                  if (word.correct) {
                    correctWordsCount += 1;
                    return <BlueText key={index}>{word.word}</BlueText>;
                  }
                  return <RedText key={index}>{word.expected}</RedText>;
                }),
              );
              const curAccuracies = [...accuracies];
              const curCorrectCounts = [...correctCounts];
              const curTotalCounts = [...totalCounts];
              curAccuracies[step - 1] = Math.floor((correctWordsCount / words.length) * 1000) / 10;
              curCorrectCounts[step - 1] = correctWordsCount;
              curTotalCounts[step - 1] = words.length;
              setAccuracies(curAccuracies);
              setCorrectCounts(curCorrectCounts);
              setTotalCounts(curTotalCounts);
              if (step === scripts.length) {
                setOutroStatus(0);
                setStatus(4);
              }
            }, 3000);
            endRecognizingVoice();
            endWebSocket();
            console.log('206번째 줄에서 close가 발생했습니다!');
          } else {
            console.log('sibal');
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
      };

      webSocket.current.onclose = () => {
        console.log('🔌 WebSocket 연결 종료');
        endRecognizingVoice();
        endWebSocket();
      };
    };
    start();
  }, []);
  const contextValue: TestContext = {
    status,
    introStatus,
    setIntroStatus,
    script: scripts[step - 1],
    step,
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
        <ProgressBar step={step} totalStep={scripts.length} />
        <PracticeDescription introStatus={introStatus} status={status} />
        <Outlet context={contextValue} />
        {status === 4 && (
          <Result accuracies={accuracies} totalCounts={totalCounts} correctCounts={correctCounts} />
        )}
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
