import axios, { AxiosInstance } from 'axios';
import { errorHandler, successHandler } from '../utils/requestHandlers';

const yandexBaseUrl = 'https://ya-praktikum.tech/api/v2';

const isSSR = typeof window === 'undefined';

const axiosProxyYandexApi: AxiosInstance = axios.create({
  baseURL: yandexBaseUrl,
  withCredentials: true,
});

const baseURL = isSSR ? '' : window.location.origin.replace('3000', '3001');

const axiosServerApi: AxiosInstance = axios.create({ baseURL });

axiosProxyYandexApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

axiosServerApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

const REDIRECT_URI = isSSR ? '' : `${window.location.origin}:3000`;
const CLIENT_ID = '3f0f557b908a4de88942a25cfa35a090';
const TEST_LOGIN = 'Login123';
const TEST_PASSWORD = 'Password1234';
const OAUTH_ROUTE = '/oauth/yandex';

export {
  yandexBaseUrl,
  axiosProxyYandexApi as axiosYandexApi,
  axiosServerApi,
  REDIRECT_URI,
  CLIENT_ID,
  TEST_LOGIN,
  TEST_PASSWORD,
  OAUTH_ROUTE,
};
