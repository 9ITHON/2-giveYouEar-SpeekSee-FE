import styled from 'styled-components';

interface ActivityButtonImgProps {
  $diffSize: string;
}

const ActivityButtonStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  background: #d7e8ff;
  border: 2px solid #539dff;
  border-radius: 12px;
  padding: 10px;
  width: 10rem;
  height: 10rem;
`;

const ActivityButtonText = styled.span`
  color: #539dff;
  font-size: 12px;
  font-weight: 700;
`;

const ActivityButtonImg = styled.img<ActivityButtonImgProps>`
  padding-bottom: ${props => props.$diffSize}px;
`;

const ActivityButton = ({ icon, width, diffSize, onClick, children }) => {
  return (
    <ActivityButtonStyle onClick={onClick}>
      <ActivityButtonImg src={icon} alt="" width={width} $diffSize={diffSize} />
      <ActivityButtonText>{children}</ActivityButtonText>
    </ActivityButtonStyle>
  );
};

export default ActivityButton;
