import { XAxis, Bar, ResponsiveContainer, BarChart, Cell } from 'recharts';

const data = [
  { name: '월', points: 30, color: '#C9E0FF' },
  { name: '화', points: 40, color: '#B7D6FF' },
  { name: '수', points: 50, color: '#A2CAFF' },
  { name: '목', points: 60, color: '#93C1FF' },
  { name: '금', points: 70, color: '#81B7FF' },
  { name: '토', points: 80, color: '#6DABFD' },
  { name: '일', points: 100, color: '#539DFF' },
];

const MyChart = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 300,
        height: 270,
		marginTop: "15px"
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
            {data.map((_, idx) => (
              <Cell key={idx} fill={data[idx % data.length]['color']} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
