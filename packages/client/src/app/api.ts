import axios, { AxiosInstance } from 'axios';
import { errorHandler, successHandler } from '../main';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

export {
  axiosInstance,
};
