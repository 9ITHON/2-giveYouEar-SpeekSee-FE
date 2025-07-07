import styled from 'styled-components';
import LeftIcon from '../../../assets/png/left.png';
import RightIcon from '../../../assets/png/right.png';
import Slide from './RecommendingFeaturesSlide';
import { useState } from 'react';

const RecommendingFeatureStyle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
  overflow: hidden;
`;

const SlideButton = styled.button`
  position: absolute;
  height: 180px;
  width: 26px;
  background: white;
  z-index: 2;
`;

const RecommendingFeatures = () => {
  const [idx, setIdx] = useState(0);
  return (
    <RecommendingFeatureStyle>
      <SlideButton
        style={{ left: '0px', cursor: idx !== 0 ? 'pointer' : 'default' }}
        onClick={() => setIdx(prev => prev - Number(prev !== 0))}
      >
        <img
          src={LeftIcon}
          alt="왼쪽"
          width="4"
          height="10"
          style={{ display: idx === 0 ? 'none' : 'inline', marginLeft: '8px' }}
        />
      </SlideButton>
      <Slide idx={idx} />
      <SlideButton
        style={{ right: '0px', cursor: idx !== 1 ? 'pointer' : 'default' }}
        onClick={() => setIdx(prev => prev + Number(prev !== 1))}
      >
        <img
          src={RightIcon}
          alt="오른쪽"
          width="4"
          height="10"
          style={{ display: idx === 1 ? 'none' : 'inline', marginRight: '6px' }}
        />
      </SlideButton>
    </RecommendingFeatureStyle>
  );
};

export default RecommendingFeatures;
