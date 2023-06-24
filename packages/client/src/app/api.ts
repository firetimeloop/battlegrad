import axios, { AxiosInstance } from 'axios';
import { errorHandler, successHandler } from '../utils/requestHandlers';

const yandexBaseUrl = 'https://ya-praktikum.tech/api/v2';

const axiosYandexApi: AxiosInstance = axios.create({
  baseURL: yandexBaseUrl,
  withCredentials: true,
});

const axiosServerApi: AxiosInstance = axios.create({
  withCredentials: true,
});

axiosYandexApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

axiosServerApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

export {
  yandexBaseUrl,
  axiosYandexApi,
  axiosServerApi,
};
