import mainApi from './mainApi';

const getLevelTestScripts = () => {
  return mainApi.get('/api/scripts/level-test', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default getLevelTestScripts;