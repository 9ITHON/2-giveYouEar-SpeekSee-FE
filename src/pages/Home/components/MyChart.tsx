import { useMemo } from 'react';
import { XAxis, Bar, ResponsiveContainer, BarChart, Cell } from 'recharts';

const data = [
  { name: '월', points: 0, color: '#C9E0FF' },
  { name: '화', points: 0, color: '#B7D6FF' },
  { name: '수', points: 0, color: '#A2CAFF' },
  { name: '목', points: 0, color: '#93C1FF' },
  { name: '금', points: 0, color: '#81B7FF' },
  { name: '토', points: 0, color: '#6DABFD' },
  { name: '일', points: 0, color: '#539DFF' },
];

const MyChart = ({ thisWeekPoints }: { thisWeekPoints: number[] }) => {
  const chartData = useMemo(
    () =>
      data.map((item, idx) => ({
        ...item,
        points: thisWeekPoints[idx] ?? 0,
      })),
    [thisWeekPoints],
  );
  return (
    <div
      style={{
        position: 'relative',
        width: 300,
        height: 270,
        marginTop: '15px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={6}
            tick={{ fill: '#81B7FF', fontSize: '12', fontWeight: '500' }}
          />
          <Bar
            dataKey="points"
            barSize={18}
            label={{
              fill: '#81B7FF',
              fontSize: 10,
              fontWeight: '500',
              position: 'top',
            }}
            radius={2}
          >
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
