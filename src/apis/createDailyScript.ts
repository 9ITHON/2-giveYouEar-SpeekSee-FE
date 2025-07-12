import mainApi from './mainApi';

const createDailyScript = (category: string, difficulty: string) => {
  return mainApi.post(
    '/api/scripts/daily',
    {
      category,
      difficulty,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      },
    },
  );
};

export default createDailyScript;
