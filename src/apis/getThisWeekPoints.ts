import mainApi from './mainApi';

const getThisWeekPoints = () => {
  return mainApi.get('/api/statistics/me/cumulative-score', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default getThisWeekPoints;
