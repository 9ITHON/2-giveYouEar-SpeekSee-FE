import styled from 'styled-components';
import ScriptSection from './components/ScriptSection';
import CloseButtonImg from '../../assets/daily-script-button.png';
import CloseButton from './components/CloseButton';
import Divider from './components/Divider';
import ActivityButtons from './components/ActivityButtons';
import { useCallback, useState } from 'react';
import Modal from './components/Modal';

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
  const scripts: React.ReactNode[] = [
    '뻗은가지 굽은가지 구부러진 가지 가지가지의\n가지 올라가지 늦가지 찐가지 달린가지\n조롱조롱 맺힌 가지 열린 가지 달린 가지\n도롱조롱 달린 가지 젊은 가지 늙은 가지\n나물할 가지 냉국 탈 가지 가지각색\n가여놓아도 나 못 먹긴 마찬가지.',
    '간장장의 공장장은 간 공장장이고\n된장장의 공장장은 된 공장장이다.',
    '비전공자도 끝까지 완주하는\n국가유산급 프론트엔드 교육 등장',
  ];
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
      {isClosed && <Modal setIsClosed={setIsClosed}/>}
      <CloseButton
        onClick={() => {
          setIsClosed(prev => !prev);
        }}
      >
        <img src={CloseButtonImg} alt="daily-scripts-page-close-button" width="18" height="18" />
      </CloseButton>
      <ScriptSection status={status} problemNo={problemNo} script={scripts[problemNo - 1]} />
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
