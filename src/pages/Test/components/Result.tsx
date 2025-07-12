import styled from 'styled-components';
import Text from './Text';
import Measure from './Measure';
import Accuracy from './Accuracy';

const ResultStyle = styled.div`
  margin-top: 10px;
  border: 1px solid #6dabfd;
  border-radius: 16px;
  padding: 12px;
  background: #ffffff;
`;

const WordsCountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordsCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 21px 8px 21px;
  & > h1 {
    padding-top: 17px;
    padding-bottom: 18px;
  }
`;

const WordsCountBoxDivider = styled.div`
  height: 89px;
  margin: 0 8px;
  margin-bottom: 8px;
  border: 0.5px solid #b7d6ff;
`;

const Result = ({
  accuracies,
  totalCounts,
  correctCounts,
}: {
  accuracies: number[];
  totalCounts: number[];
  correctCounts: number[];
}) => {
  let allTotalCounts = 0;
  let allCorrectCounts = 0;
  let accuracyAvg = 0;
  totalCounts.forEach(count => {
    allTotalCounts += count;
  });
  correctCounts.forEach(count => {
    allCorrectCounts += count;
  });
  accuracies.forEach(accuracy => {
    accuracyAvg += accuracy;
  });
  accuracyAvg /= accuracies.length;
  return (
    <ResultStyle>
      <WordsCountBox>
        <WordsCount>
          <Text>전체 단어 수</Text>
          <Measure>{allTotalCounts}</Measure>
        </WordsCount>
        <WordsCountBoxDivider />
        <WordsCount>
          <Text>맞은 단어 수</Text>
          <Measure>{allCorrectCounts}</Measure>
        </WordsCount>
      </WordsCountBox>
      <Accuracy accuracy={Math.floor(accuracyAvg * 1000) / 10} />
    </ResultStyle>
  );
};

export default Result;
