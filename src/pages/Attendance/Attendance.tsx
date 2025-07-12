import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import 캐릭터 from '../../assets/png/캐릭터.png';
import check from '../../assets/png/check.png';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .react-calendar__tile--now {
    background: none !important;
    color: inherit !important;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: none !important;
  }
`;

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  width: 100%;
  display: flex;
  justify-content: center;

  .react-calendar {
    border: none;
    font-family: inherit;
  }
`;

const Box = styled.div`
  border: 1px solid #81b7ff;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #81b7ff;
`;

const BoxSubtitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #81b7ff;
  margin-top: 30px;
`;

const CircleBg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #c9e0ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Attendance = () => {
  const [value, setValue] = useState(new Date());
  const [attendanceDays, setAttendanceDays] = useState<Date[]>([]);

  useEffect(() => {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;

    const fetchAttendance = async () => {
      try {
        const response = await axios.get('/api/attendance/calendar', {
          params: { year, month },
        });

        if (response.data.success) {
          const dateList = response.data.data.attendanceDates.map(
            (dateStr: string) => new Date(dateStr),
          );
          setAttendanceDays(dateList);
        }
      } catch (error) {
        console.error('출석 데이터 가져오기 실패:', error);
      }
    };

    fetchAttendance();
  }, [value]);

  // 날짜 비교 함수
  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <Container>
      <GlobalStyle />
      <CalendarWrapper>
        <Calendar
          value={value}
          onChange={val => setValue(val as Date)}
          calendarType="gregory"
          tileContent={({ date, view }) => {
            const isAttendanceDay = attendanceDays.some(d => isSameDate(d, date));
            return view === 'month' && isAttendanceDay ? (
              <img
                src={check}
                alt="출석 체크"
                style={{
                  width: 14,
                  height: 14,
                  display: 'block',
                  margin: '0 auto',
                  marginTop: 4,
                }}
              />
            ) : null;
          }}
        />
      </CalendarWrapper>

      <Box>
        <div>
          <BoxTitle>연속 7일 출석 시</BoxTitle>
          <BoxSubtitle>한정 캐릭터 프로필 사진 획득!</BoxSubtitle>
        </div>
        <CircleBg>
          <img src={캐릭터} style={{ width: 55.2, height: 42 }} alt="캐릭터" />
        </CircleBg>
      </Box>

      <Box>
        <div>
          <BoxTitle>연속 15일 출석 시</BoxTitle>
          <BoxSubtitle>한정 캐릭터 배경화면 사진 획득!</BoxSubtitle>
        </div>
      </Box>
    </Container>
  );
};

export default Attendance;
