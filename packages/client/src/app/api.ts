import axios, { AxiosInstance } from 'axios';
import { errorHandler, successHandler } from '../utils/requestHandlers';

const proxyYandexBaseUrl = `http://localhost:${__SERVER_PORT__}/api/v2`;

const axiosProxyYandexApi: AxiosInstance = axios.create({
  baseURL: proxyYandexBaseUrl,
  withCredentials: true,
});

const axiosServerApi: AxiosInstance = axios.create({
  baseURL: `http://localhost:${__SERVER_PORT__}`,
  withCredentials: true,
});

axiosProxyYandexApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

axiosServerApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

const REDIRECT_URI = 'http://localhost:3000';
const CLIENT_ID = '3f0f557b908a4de88942a25cfa35a090';
const TEST_LOGIN = 'Login123';
const TEST_PASSWORD = 'Password1234';
const OAUTH_ROUTE = '/oauth/yandex';

export {
  proxyYandexBaseUrl,
  axiosProxyYandexApi as axiosYandexApi,
  axiosServerApi,
  REDIRECT_URI,
  CLIENT_ID,
  TEST_LOGIN,
  TEST_PASSWORD,
  OAUTH_ROUTE,
};
