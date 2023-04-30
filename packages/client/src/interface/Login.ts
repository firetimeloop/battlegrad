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
  display_name: z.string(),
  login: z.string(),
  email: z.string(),
  phone: z.string(),
  avatar: z.string(),
});

export type IUser = z.infer<typeof UserModel>

export type IGetMeResponse = IUser | IErrorResponse
