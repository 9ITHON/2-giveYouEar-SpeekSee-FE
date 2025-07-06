import styled from 'styled-components';
import MyChart from "./MyChart";

const ThisWeekChartStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 24px;
  border: 1px solid #81b7ff;
  border-radius: 12px;
  padding: 16px 16px 8px 16px;
`;

const 응원의한마디 = styled.h1`
  color: #6dabfd;
  font-size: 16px;
  font-weight: 700;
  margin-top: 8px;
  margin-bottom: 4px;
`;

const ThisWeekChart = () => {
  return (
    <ThisWeekChartStyle>
      <응원의한마디>잘하고 있어요! 오늘도 열심히 해봐요!</응원의한마디>
      <MyChart />
    </ThisWeekChartStyle>
  );
};

export default ThisWeekChart;
