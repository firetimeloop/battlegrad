import axios from 'axios';

import { ApiError } from '../helpers/apiError';

const axiosYandexApi = axios.create({
  baseURL: process.env.YANDEX_BASE_URL,
  withCredentials: true,
});

axiosYandexApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Promise.reject(
          new ApiError(error.response.data.reason, error.response.status),
        );
      }
    }

    return Promise.reject(error);
  },
);

export class YandexAPIService {
  // eslint-disable-next-line
  async getCurrentUser() {
    const result = await axiosYandexApi.get('/auth/user');

    return result.data;
  }
}
