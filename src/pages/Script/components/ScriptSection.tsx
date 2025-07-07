import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import Result from './Result';

interface ScriptContentProps {
  $status: number;
}

const ScriptSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9f2ff;
  width: 100%;
  height: 60em;
`;

const PracticeDescription = styled.div`
  margin-top: 3rem;
  color: #6dabfd;
  font-size: 16px;
  font-weight: 700;
`;

const ScriptContent = styled.div<ScriptContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: ${props => (props.$status === 4 ? 100 : 300)}px;
  margin-top: 53px;
  text-align: center;
  color: #a2caff;
  font-size: 16px;
  white-space: pre-line;
  line-height: 1.1em;
  overflox-y: auto;
`;

const ScriptSection = ({
  status,
  problemNo,
  totalStep,
  script,
}: {
  status: number;
  problemNo: number;
  totalStep: number;
  script: React.ReactNode;
}) => {
  return (
    <ScriptSectionStyle>
      <ProgressBar step={problemNo} totalStep={totalStep} />
      <PracticeDescription>
        {status === 4
          ? '이번 문제의 결과를 확인하세요!'
          : status === 5
          ? '문제를 다 풀었어요! 결과를 확인해 보세요!'
          : '버튼을 누른 뒤 아래 문장을 읽어주세요.'}
      </PracticeDescription>
      {status !== 5 && (
        <ScriptContent $status={status}>{script ? script : '준비 중...'}</ScriptContent>
      )}
      {status === 4 && <Result />}
    </ScriptSectionStyle>
  );
};

export default ScriptSection;
