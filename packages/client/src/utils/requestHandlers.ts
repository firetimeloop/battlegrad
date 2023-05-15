import { AxiosError, AxiosResponse } from 'axios';
import { store } from '../app/store';
import { setAlert } from '../components/Alert/slice';

const skipRequests = [
  { url: '/auth/user', method: 'get' },
];

export const errorHandler = (error: AxiosError<{reason?: string}>) => {
  if (error.config === undefined) {
    return Promise.reject(error);
  }

  const { url, method } = error.config;

  // показываем алерт только для запросов которых нет в skipRequests
  const notSkipped = !skipRequests.some((item) => {
    const sameUrl = item.url === url;
    const sameMethod = item.method === method?.toLowerCase();
    return sameUrl && sameMethod;
  });

  if (notSkipped && error.response?.data?.reason) {
    store.dispatch(setAlert(error.response?.data?.reason));
  }

  return Promise.reject(error);
};

export const successHandler = (response: AxiosResponse) => {
  // а сюда действия для успешных запросов
  console.log('Handled response', response);
  return response;
};
