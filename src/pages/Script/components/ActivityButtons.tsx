import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ActivityButton from './ActivityButton';
import AnalysingText from './AnalysingText';
import HomeIcon from '../../../assets/png/back-home.png';
import RecordIcon from '../../../assets/png/record.png';
import RecordingIcon from '../../../assets/png/recording.png';

interface ActivityButtonsProps {
  status: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  isTalking: boolean;
  totalStep: number;
  handleRecordBtn: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ActivityButtonsStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 68px;
  padding: 8em 0 6.4em 0;
`;

const ActivityButtons = ({ status, isTalking, handleRecordBtn }: ActivityButtonsProps) => {
  const navigate = useNavigate();
  return (
    <ActivityButtonsStyle>
      {status < 3 && (
        <ActivityButton
          icon={status === 1 && isTalking ? RecordingIcon : RecordIcon}
          isTalking={status === 1 && isTalking}
          width={32}
          diffSize={8}
          onClick={() => {
            handleRecordBtn();
          }}
        >
          {status === 0 ? '녹음하기' : status === 1 ? '녹음 중...' : '완료!'}
        </ActivityButton>
      )}
      {status === 3 && <AnalysingText>분석중 ...</AnalysingText>}
      {status === 5 && (
        <ActivityButton
          width={38}
          icon={HomeIcon}
          diffSize={14}
          onClick={() => navigate('/script', { replace: true })}
        >
          나가기
        </ActivityButton>
      )}
    </ActivityButtonsStyle>
  );
};

export default ActivityButtons;
