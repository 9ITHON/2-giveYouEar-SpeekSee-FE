import axios from 'axios';

const mainApi = axios.create({
  baseURL: 'https://api.give-you-ear.kro.kr',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default mainApi;
