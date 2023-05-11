import { AxiosError, AxiosResponse } from 'axios';
import { store } from '../app/store';
import { setAlert } from '../components/Alert/slice';

const skipAlert = [
  { url: '/auth/user', method: 'get' },
];

export const errorHandler = (error: AxiosError<{reason?: string}>) => {
  // сюда можно добавить действия для всех запросов с ошибкой
  console.log('Handled error', error);
  if (
    !skipAlert.some((item) => (
      item.url === error.config?.url
      && item.method === error.config.method?.toLowerCase()
    ))
    && error.response?.data?.reason
  ) {
    store.dispatch(setAlert(error.response?.data?.reason));
  }

  return Promise.reject(error);
};

export const successHandler = (response: AxiosResponse) => {
  // а сюда действия для успешных запросов
  console.log('Handled response', response);
  return response;
};
