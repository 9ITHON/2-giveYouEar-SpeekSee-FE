import styled from 'styled-components';
import ScriptSection from './components/ScriptSection';
import CloseButtonImg from '../../assets/png/daily-script-button.png';
import CloseButton from './components/CloseButton';
import Divider from './components/Divider';
import ActivityButtons from './components/ActivityButtons';
import { useCallback, useEffect, useState } from 'react';
import Modal from './components/Modal';
import { useLocation } from 'react-router-dom';
import getOneScript from '../../apis/getOneScript';

const PracticeStyle = styled.div`
  height: 100%;
  background-color: #a2caff;
  position: relative;
`;

const Practice = () => {
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
  const location = useLocation();
  const [scripts, setScripts] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const getScript = async () => {
      try {
        const path = location.pathname.split('/');
        const response = await getOneScript(Number(path[path.length - 1]));
        return response?.data.data.content;
      } catch (error) {
        console.log(error);
      }
    };
    const curScripts = [...scripts];
    if (location.state === null) {
      const newScript = getScript();
      curScripts.push(newScript);
    } else {
      curScripts.push(location.state.content);
    }
    setScripts(curScripts);
  }, []);
  const handleRecordBtn = useCallback(() => {
    if (status === 0) {
      setStatus(1);
    } else if (status === 1) {
      setStatus(2);
      setTimeout(() => {
        setStatus(3);
        setTimeout(() => {
          setStatus(4);
        }, 2000);
      }, 2000);
    }
  }, [status]);
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
        problemNo={problemNo}
        totalStep={scripts.length}
        script={scripts[problemNo - 1]}
      />
      <Divider />
      <ActivityButtons
        status={status}
        setStatus={setStatus}
        handleRecordBtn={handleRecordBtn}
        setProblemNo={setProblemNo}
      />
    </PracticeStyle>
  );
};

export default Practice;
