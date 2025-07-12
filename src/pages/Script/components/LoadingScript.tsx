import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LoadingScriptStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d7e8ff;
  border: 1px solid #6dabfd;
  border-radius: 7px;
  padding: 10px;
  position: fixed;
  bottom: 50;
  animation: ${pulse} 1.5s infinite;
`;

const LoadingText = styled.h3`
  color: #6dabfd;
  font-size: 14px;
  font-weight: 700;
`;

const LoadingScript = () => {
  return (
    <LoadingScriptStyle>
      <LoadingText>대본 생성 중...</LoadingText>
    </LoadingScriptStyle>
  );
};

export default LoadingScript;
