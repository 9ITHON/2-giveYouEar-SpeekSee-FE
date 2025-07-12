import styled from 'styled-components';
import RecommendingFeature from './RecommedingFeature';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import type { SlideStyleProps } from '../types/SlideStyleProps';
import Description from './Description';
import DailyScriptIcon from '../../../assets/png/daily-script.png';
import DailyMissionIcon from '../../../assets/png/daily-mission.png';
import AttendanceCheckIcon from '../../../assets/png/attendance-check.png';
import DashboardIcon from '../../../assets/png/dashboard.png';

const SlideStyle = styled.div<SlideStyleProps>`
  display: flex;
  gap: 16px;
  padding: 0 28px;
  transform: ${props => `translateX(${-176 * props.$idx}px)`};
  transition: transform 0.5s ease;
`;

const IconDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
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
        <Title>데일리 추천 대본</Title>
        <Description>{'매일 자신에게 맞는 대본을\nAI로 추천 받아보세요!'}</Description>
        <IconDiv>
          <img src={DailyScriptIcon} alt="데일리 추천 대본" width="64" height="55" />
        </IconDiv>
      </RecommendingFeature>
      <RecommendingFeature>
        <Title>데일리 미션</Title>
        <Description>{'데일리 미션을 통해 재밌게\n학습하고 포인트도 받아보세요!'}</Description>
        <IconDiv>
          <img src={DailyMissionIcon} alt="데일리 미션" width="64" height="64" />
        </IconDiv>
      </RecommendingFeature>
      <RecommendingFeature onClick={() => navigate('/dashboard')}>
        <Title>대시보드</Title>
        <Description>{'훈련으로 단련된 실력을\n대시보드를 통해 한 눈에 보세요!'}</Description>
        <IconDiv>
          <img src={DashboardIcon} alt="대시보드" width="63" height="56" />
        </IconDiv>
      </RecommendingFeature>
      <RecommendingFeature
        onClick={() => {
          navigate('/attendance');
        }}
      >
        <Title>출석체크</Title>
        <Description>
          {'이번 달은 얼마나 출석했는지 확인하고\n연속 출석해서 선물을 받아보세요!'}
        </Description>
        <IconDiv>
          <img
            src={AttendanceCheckIcon}
            alt="출석체크"
            width="64"
            height="64"
            style={{ marginBottom: '10px' }}
          />
        </IconDiv>
      </RecommendingFeature>
    </SlideStyle>
  );
};

export default Slide;
