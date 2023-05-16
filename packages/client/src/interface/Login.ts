import { z } from 'zod';

export interface ILoginProps {
  login: string
  password: string
}

export interface IErrorResponse {
  reason: string
}

export type ILoginResponse = IErrorResponse | null

export const UserModel = z.object({
  id: z.number(),
  first_name: z.string(),
  second_name: z.string(),
  display_name: z.string().nullable(),
  login: z.string(),
  email: z.string(),
  phone: z.string(),
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
