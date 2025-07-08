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
  accuracy,
  correctCount,
  totalCount,
}: {
  accuracy: number;
  correctCount: number;
  totalCount: number;
}) => {
  return (
    <ResultStyle>
      <WordsCountBox>
        <WordsCount>
          <Text>전체 단어 수</Text>
          <Measure>{totalCount}</Measure>
        </WordsCount>
        <WordsCountBoxDivider />
        <WordsCount>
          <Text>맞은 단어 수</Text>
          <Measure>{correctCount}</Measure>
        </WordsCount>
      </WordsCountBox>
      <Accuracy accuracy={accuracy} />
    </ResultStyle>
  );
};

export default Result;
