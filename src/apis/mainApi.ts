import axios from 'axios';

const mainApi = axios.create({
  baseURL: 'https://api.give-you-ear.kro.kr',
});


export default mainApi;
