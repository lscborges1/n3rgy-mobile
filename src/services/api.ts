import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://consumer-api.data.n3rgy.com/',
});
