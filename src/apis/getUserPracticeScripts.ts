import mainApi from './mainApi';

const getUserPracticeScripts = () => {
  return mainApi.get(`/api/scripts/my`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default getUserPracticeScripts;
