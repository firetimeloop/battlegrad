import {
  IGetMeResponse, ILoginProps, ILoginResponse, IThunkApi,
} from '../interface';
import { axiosInstance } from '../app/api';

export async function login(data: ILoginProps, thunkApi: IThunkApi): Promise<ILoginResponse> {
  const controller = new AbortController();
  const response = await axiosInstance.post<ILoginResponse>('/auth/signin', data, {
    signal: thunkApi.signal,
  });
  controller.abort();
  return response.data;
}

export async function getMe(thunkApi: IThunkApi): Promise<IGetMeResponse> {
  const controller = new AbortController();
  const response = await axiosInstance.get<IGetMeResponse>('/auth/user', {
    signal: thunkApi.signal,
  });
  controller.abort();
  return response.data;
}
