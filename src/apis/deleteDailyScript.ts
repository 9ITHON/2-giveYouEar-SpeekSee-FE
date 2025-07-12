import mainApi from './mainApi';

const deleteDailyScript = (scriptid: number) => {
  return mainApi.delete(
    `/api/scripts/${scriptid}`,
    {
      headers: {
        Authorization:
          `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export default deleteDailyScript;
