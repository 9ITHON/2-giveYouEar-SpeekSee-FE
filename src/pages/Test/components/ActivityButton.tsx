import styled from 'styled-components';

interface ActivityButtonImgProps {
  $diffSize: number;
}

interface ActivityButtonProps {
  $isTalking: boolean | undefined;
}

const ActivityButtonStyle = styled.button<ActivityButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  background: ${props => (props.$isTalking ? '#539dff' : '#d7e8ff')};
  border: 2px solid ${props => (props.$isTalking ? '#ffffff' : '#539dff')};
  border-radius: 12px;
  padding: 10px;
  width: 10rem;
  height: 10rem;
`;

const ActivityButtonText = styled.span<ActivityButtonProps>`
  color: ${props => (props.$isTalking ? '#ffffff' : '#539dff')};
  font-size: 12px;
  font-weight: 700;
`;

const ActivityButtonImg = styled.img<ActivityButtonImgProps>`
  padding-bottom: ${props => props.$diffSize}px;
`;

const ActivityButton = ({
  icon,
  isTalking,
  width,
  diffSize,
  onClick,
  children,
}: {
  icon: string;
  isTalking?: boolean | undefined;
  width: number;
  diffSize: number;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <ActivityButtonStyle $isTalking={isTalking} onClick={onClick}>
      <ActivityButtonImg src={icon} alt="" width={width} $diffSize={diffSize} />
      <ActivityButtonText $isTalking={isTalking}>{children}</ActivityButtonText>
    </ActivityButtonStyle>
  );
};

export default ActivityButton;
