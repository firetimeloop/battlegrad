import { z } from 'zod';
import { IThunkApi } from './index';

export interface ILoginProps {
  login: string
  password: string
}

export interface IErrorResponse {
  reason: string
}

export interface IBaseApiProps {
  thunkApi: IThunkApi
}

export interface ILoginApiProps extends IBaseApiProps {
  data: ILoginProps
}

export type ILoginResponse = IErrorResponse | null

export const UserModel = z.object({
  id: z.number(),
  first_name: z.string(),
  second_name: z.string(),
  display_name: z.string(),
  login: z.string(),
  email: z.string(),
  phone: z.string(),
  avatar: z.string(),
});

export type IUser = z.infer<typeof UserModel>

export type IGetMeResponse = IUser | IErrorResponse

export const LoginValidationModel = z.object({
  login: z.string().min(4, 'Логин не может быть короче 4 символов'),
  password: z.string().min(4, 'Пароль не может быть короче 4 символов'),
});
