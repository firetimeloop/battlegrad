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
const CLIENT_ID = '3f0f557b908a4de88942a25cfa35a090';
const TEST_LOGIN = 'Login123';
const TEST_PASSWORD = 'Password1234';

export {
  axiosYandexApi,
  REDIRECT_URI,
  CLIENT_ID,
  TEST_LOGIN,
  TEST_PASSWORD,
};
