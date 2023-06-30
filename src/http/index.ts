import axios from 'axios';
import { apiUrl } from '../constants/constants';

import { getToken } from '../utils/index';

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  data: {},
  timeout: 180000,
});

api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});


export default api;
