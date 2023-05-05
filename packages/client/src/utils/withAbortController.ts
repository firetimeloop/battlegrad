import { AxiosResponse } from 'axios';

export const withAbortController = async <T>(
  promise: Promise<AxiosResponse<T>>,
) => {
  const controller = new AbortController();
  const response = await promise;
  controller.abort();
  return response.data;
};
