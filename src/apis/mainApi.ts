import axios from 'axios';

const mainApi = axios.create({
  baseURL: 'http://54.180.116.11:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default mainApi;
