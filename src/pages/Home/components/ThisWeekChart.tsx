import styled from 'styled-components';
import MyChart from './MyChart';
import { useEffect, useState } from 'react';
import getThisWeekPoints from '../../../apis/getThisWeekPoints';
import { getWeekday, isAtLeastOneWeekApart } from '../utils/date';

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
  const [thisWeekPoints, setThisWeekPoints] = useState<number[]>();
  useEffect(() => {
    const getThisPoints = async () => {
      try {
        const response = await getThisWeekPoints();
        const allPoints = response.data.data;
        let today = new Date();
        let dateToString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        let todayOfTheDay = today.getDay() === 0 ? 7 : today.getDay();
        let idx = allPoints.length - 1;
        const weekScores = [0, 0, 0, 0, 0, 0, 0];
        while (
          idx >= 0 &&
          todayOfTheDay >= 1 &&
          !isAtLeastOneWeekApart(allPoints[idx].date, dateToString)
        ) {
          const dow = getWeekday(allPoints[idx].date);
          const mappedIdx = (dow + 6) % 7;
          weekScores[mappedIdx] = allPoints[idx].cumulativeScore;
          idx--;
        }
        setThisWeekPoints(weekScores);
      } catch (error) {
        console.log(error);
      }
    };
    getThisPoints();
  }, []);

  return (
    <ThisWeekChartStyle>
      {thisWeekPoints === undefined ? (
        '로딩 중...'
      ) : (
        <>
          <응원의한마디>잘하고 있어요! 오늘도 열심히 해봐요!</응원의한마디>
          <MyChart thisWeekPoints={thisWeekPoints} />
        </>
      )}
    </ThisWeekChartStyle>
  );
};

export default ThisWeekChart;
