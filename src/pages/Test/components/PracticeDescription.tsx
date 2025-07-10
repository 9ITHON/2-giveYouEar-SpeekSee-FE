import styled from 'styled-components';

const PracticeDescriptionStyle = styled.div`
  margin-top: 3rem;
  color: #6dabfd;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  white-space: pre-line;
`;

const PracticeDescription = ({ introStatus, status }: { introStatus: number; status: number }) => {
  return (
    <PracticeDescriptionStyle>
      {introStatus >= 0
        ? introStatus === 0
          ? '안녕하세요!'
          : introStatus === 1
          ? '시작하기 전, 여러분이 어느 부분에서\n어려워하는지 알아보고자\n간단한 테스트를 해보려고 합니다!'
          : '테스트 할 수 있도록 조용한 공간에서 시작해주시고\n준비가 되었다면 아래 녹음하기 버튼을 눌러주세요!'
        : status === 4
        ? '이번 문제의 결과를 확인하세요!'
        : status === 5
        ? '문제를 다 풀었어요! 결과를 확인해 보세요!'
        : '버튼을 누른 뒤 아래 문장을 읽어주세요.'}
    </PracticeDescriptionStyle>
  );
};

export default PracticeDescription;
