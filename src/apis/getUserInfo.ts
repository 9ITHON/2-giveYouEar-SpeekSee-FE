import mainApi from './mainApi';

const getUserInfo = () => {
  return mainApi.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default getUserInfo;
