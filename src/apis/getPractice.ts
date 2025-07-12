import mainApi from './mainApi';

const getPractice = () => {
  return mainApi.get('/api/practices/me', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default getPractice;
