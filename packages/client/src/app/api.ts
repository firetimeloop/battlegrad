import axios, { AxiosInstance } from 'axios';
import { errorHandler, successHandler } from '../utils/requestHandlers';

const axiosYandexApi: AxiosInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
});

axiosYandexApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

const REDIRECT_URI = 'http://localhost:3000';

export {
  axiosYandexApi,
  REDIRECT_URI,
};
