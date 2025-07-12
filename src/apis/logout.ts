import mainApi from './mainApi';

const logout = () => {
  return mainApi.post('/api/auth/logout', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default logout;
