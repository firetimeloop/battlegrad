import { z } from 'zod';
import type { IErrorResponse } from '.';

export interface ILoginProps {
  login: string
  password: string
}

export type ILoginResponse = IErrorResponse | null

export const UserModel = z.object({
  id: z.number(),
  first_name: z.string(),
  second_name: z.string(),
  display_name: z.string().nullable(),
  login: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  avatar: z.string().nullable(),
});

export type IUser = z.infer<typeof UserModel>

export type IGetMeResponse = IUser | IErrorResponse

export const MIN_LOGIN = 4;
export const MIN_PASSWORD = 4;
export const LoginValidationModel = z.object({
  login: z.string().min(MIN_LOGIN, `Логин не может быть короче ${MIN_LOGIN} символов`),
  password: z.string().min(MIN_PASSWORD, `Пароль не может быть короче ${MIN_PASSWORD} символов`),
});

export interface IGetServiceIdProps {
  redirectUri: string
}
export interface IOauthProps {
  redirect_uri: string
  code: string
}
export interface IGetServiceIdResponse {
  service_id?: string
}
