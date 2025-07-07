import styled from 'styled-components';
import RecommendingFeature from './RecommedingFeature';
import RecommendingFeatureTitle from './RecommendingFeatureTitle';
import { useNavigate } from 'react-router-dom';
import type { SlideStyleProps } from '../types/SlideStyleProps';

const SlideStyle = styled.div<SlideStyleProps>`
  display: flex;
  gap: 16px;
  padding: 0 28px;
  transform: ${props => `translateX(${-176 * props.$idx}px)`};
  transition: transform 0.5s ease;
`;

const Slide = ({ idx }: { idx: number }) => {
  const navigate = useNavigate();
  return (
    <SlideStyle $idx={idx}>
      <RecommendingFeature
        onClick={() => {
          navigate('/script');
        }}
      >
        <RecommendingFeatureTitle>데일리 추천 대본</RecommendingFeatureTitle>
      </RecommendingFeature>
      <RecommendingFeature>
        <RecommendingFeatureTitle>데일리 미션</RecommendingFeatureTitle>
      </RecommendingFeature>
      <RecommendingFeature
        onClick={() => {
          navigate('/attendance');
        }}
      >
        <RecommendingFeatureTitle>출석체크</RecommendingFeatureTitle>
      </RecommendingFeature>
    </SlideStyle>
  );
};

export default Slide;
