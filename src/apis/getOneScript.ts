import mainApi from './mainApi';

const getOneScript = (scriptid: number) => {
  return mainApi.get(`/api/scripts/${scriptid}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
  });
};

export default getOneScript;
