import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

export const axiosPrivate = axios.create({
  baseURL:process.env.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});