import styled from 'styled-components';
import RecommendingFeature from './components/RecommendingFeatures';
import ThisWeekChart from './components/ThisWeekChart';

const HomeStyle = styled.div`
  margin-top: 120px;
`;

const HomeContentTitle = styled.h4`
  color: #6dabfd;
  font-size: 16px;
  padding-left: 24px;
  margin-bottom: 16px;
`;

const Home = () => {
  return (
    <HomeStyle>
      <div>
        <HomeContentTitle>추천 기능</HomeContentTitle>
        <RecommendingFeature />
      </div>
      <div>
        <HomeContentTitle>최근 기록</HomeContentTitle>
        <ThisWeekChart />
      </div>
    </HomeStyle>
  );
};
export default Home;
