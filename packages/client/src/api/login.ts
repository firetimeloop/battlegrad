import {
  IBaseApiProps, IGetMeResponse, ILoginApiProps, ILoginResponse,
} from '../interface';
import { axiosYandexApi } from '../app/api';
import { withAbortController } from '../utils/withAbortController';

export async function login({ thunkApi, data }: ILoginApiProps) {
  return withAbortController<ILoginResponse>(
    axiosYandexApi.post<ILoginResponse>('/auth/signin', data, {
      signal: thunkApi.signal,
    }),
  );
}

export async function getMe({ thunkApi }: IBaseApiProps) {
  return withAbortController<IGetMeResponse>(
    axiosYandexApi.get<IGetMeResponse>('/auth/user', {
      signal: thunkApi.signal,
    }),
  );
}
