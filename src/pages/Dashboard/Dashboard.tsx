import styled from 'styled-components';
import UserStat from './components/UserStat';

const DashboardStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 0 24px;
  margin-top: 12px;
  border: 1px solid #81b7ff;
  border-radius: 8px;
  padding: 32px 24px;
`;

const Dashboard = () => {
  const stats = [
    { name: '속도', value: 20 },
    { name: '억양', value: 30 },
    { name: '정확도', value: 30 },
    { name: '사용 지속', value: 35 },
    { name: '발음 일관성', value: 40 },
    { name: '발화 안정성', value: 45 },
    { name: '억양/강세 분석', value: 50 },
    { name: '문장 처리 능력', value: 49 },
    { name: '학습 점수 개선', value: 64 },
  ];
  return (
    <DashboardStyle>
      {stats.map((stat, index) => (
        <UserStat key={index} name={stat.name} value={stat.value} />
      ))}
    </DashboardStyle>
  );
};

export default Dashboard;
