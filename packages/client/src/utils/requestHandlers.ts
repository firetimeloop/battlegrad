import { AxiosResponse } from 'axios';

export const errorHandler = (error: Error) => {
  // сюда можно добавить действия для всех запросов с ошибкой
  console.log('Handled error', error);
  return Promise.reject(error);
};

export const successHandler = (response: AxiosResponse) => {
  // а сюда действия для успешных запросов
  console.log('Handled response', response);
  return response;
};
