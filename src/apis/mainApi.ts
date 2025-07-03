import axios from 'axios';

const mainApi = axios.create({
  baseURL: 'https://api.speeksee.com',
});

export default mainApi;
