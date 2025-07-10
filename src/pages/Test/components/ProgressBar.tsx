import styled from 'styled-components';

interface ProgressGageProps {
  $step: number;
  $totalStep: number;
}

interface ProgressBarProps {
  step: number;
  totalStep: number;
}

const ProgressBarStyle = styled.div`
  width: 300px;
  height: 12px;
  margin-top: 9rem;
  border-radius: 10px;
  background: #ffffff;
  position: relative;
`;

const ProgressGage = styled.div<ProgressGageProps>`
  width: ${props => (300 / props.$totalStep) * props.$step}px;
  height: 12px;
  border-radius: 10px;
  position: absolute;
  left: 0;
  background: #81b7ff;
`;

const ProgressBar = ({ step, totalStep }: ProgressBarProps) => {
  return (
    <ProgressBarStyle>
      <ProgressGage $step={step} $totalStep={totalStep} />
    </ProgressBarStyle>
  );
};

export default ProgressBar;
