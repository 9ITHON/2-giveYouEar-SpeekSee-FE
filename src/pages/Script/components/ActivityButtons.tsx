import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ActivityButton from './ActivityButton';
import AnalysingText from './AnalysingText';
import HomeIcon from '../../../assets/home.png';
import NextIcon from '../../../assets/next.png';
import RepeatIcon from '../../../assets/repeat.png';
import RecordIcon from '../../../assets/record.png';

interface ActivityButtonsProps {
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  handleRecordBtn: () => void;
  setProblemNo: React.Dispatch<React.SetStateAction<number>>;
}

const ActivityButtonsStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 68px;
  padding: 8em 0 6.4em 0;
`;

const ActivityButtons = ({
  status,
  setStatus,
  handleRecordBtn,
  setProblemNo,
}: ActivityButtonsProps) => {
  const navigate = useNavigate();
  return (
    <ActivityButtonsStyle>
      {status < 3 && (
        <ActivityButton
          icon={RecordIcon}
          width={32}
          diffSize={8}
          onClick={() => {
            handleRecordBtn();
          }}
        >
          {status === 0 ? '녹음하기' : status === 1 ? '녹음 중...' : '녹음 완료'}
        </ActivityButton>
      )}
      {status === 3 && <AnalysingText>분석중 ...</AnalysingText>}
      {status === 4 && (
        <ActivityButton
          icon={NextIcon}
          width={42.5}
          diffSize={16}
          onClick={() => {
            setProblemNo(prev => {
              if (prev === 3) {
                setStatus(5);
                return prev;
              }
              return prev + 1;
            });
            setStatus(0);
          }}
        >
          넘어가기
        </ActivityButton>
      )}
      {status === 4 && (
        <ActivityButton
          icon={RepeatIcon}
          width={40}
          diffSize={12}
          onClick={() => {
            setStatus(0);
          }}
        >
          다시 연습하기
        </ActivityButton>
      )}
      {status === 5 && (
        <ActivityButton width={38} icon={HomeIcon} diffSize={14} onClick={() => navigate('/')}>
          나가기
        </ActivityButton>
      )}
    </ActivityButtonsStyle>
  );
};

export default ActivityButtons;