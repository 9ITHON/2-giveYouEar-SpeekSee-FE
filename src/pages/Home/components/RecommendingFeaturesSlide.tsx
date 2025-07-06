import styled from 'styled-components';
import RecommendingFeature from './RecommedingFeature';
import RecommendingFeatureTitle from './RecommendingFeatureTitle';

const SlideStyle = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 28px;
  transform: ${props => `translateX(${-176 * props.$idx}px)`};
  transition: transform 0.5s ease;
`;

const Slide = ({ idx }: { idx: number }) => {
  return (
    <SlideStyle $idx={idx}>
      <RecommendingFeature>
        <RecommendingFeatureTitle>데일리 추천 대본</RecommendingFeatureTitle>
      </RecommendingFeature>
      <RecommendingFeature>
        <RecommendingFeatureTitle>데일리 미션</RecommendingFeatureTitle>
      </RecommendingFeature>
      <RecommendingFeature>
        <RecommendingFeatureTitle>출석체크</RecommendingFeatureTitle>
      </RecommendingFeature>
    </SlideStyle>
  );
};

export default Slide;
