import styled from 'styled-components';

const ResultStyle = styled.div`
  width: 205px;
  margin-top: 10px;
  border: 1px solid #6dabfd;
  border-radius: 16px;
  padding: 0 7px;
  background: #ffffff;
`;

const AccuracyText = styled.span`
  display: block;
  text-align: center;
  color: #81b7ff;
  font-size: 12px;
`;

const AccuracyRate = styled.h1`
  padding-top: 12px;
  text-align: center;
  color: #539dff;
  font-size: 36px;
`;

const AccuracyStyle = styled.div`
  border-bottom: 1px solid #6dabfd;
  padding: 24px 0px;
`;

const Accuracy = ({ accuracy }) => {
  return (
    <AccuracyStyle>
      <AccuracyText>정확도(%)</AccuracyText>
      <AccuracyRate>{accuracy}</AccuracyRate>
    </AccuracyStyle>
  );
};

const CheerMessage = styled.span`
height: 70px;
margin: 16px 0 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #81b7ff;
  font-size: 12px;
  white-space: pre-line;
  line-height: 1.1em;
`;

const Result = () => {
  const accuracyRate = 87;
  return (
    <ResultStyle>
      <Accuracy accuracy={accuracyRate} />
      <CheerMessage>
        {accuracyRate >= 80 ? '잘하고 있어요!\n지금처럼 열심히 해주세요!' : '화이팅'}
      </CheerMessage>
    </ResultStyle>
  );
};

export default Result;
