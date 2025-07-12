import styled from 'styled-components';
import Text from './Text';
import Measure from './Measure';

const AccuracyStyle = styled.div`
  border-top: 1px solid #B7D6FF;
  padding: 24px 0px;
`;

const Accuracy = ({ accuracy }: { accuracy: number }) => {
  return (
    <AccuracyStyle>
      <Text>정확도(%)</Text>
      <Measure>{accuracy}</Measure>
    </AccuracyStyle>
  );
};

export default Accuracy;
