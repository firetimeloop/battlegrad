import { z } from 'zod';
import { MIN_LOGIN, MIN_PASSWORD } from './Login';
import type { IErrorResponse } from './index';

export interface IRegisterSuccessResponse {
  id: string
}

export type IRegisterResponse = IErrorResponse | IRegisterSuccessResponse

export interface IRegisterForm {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  passwordRepeat: string
  phone: string
}
export type IRegisterProps = Omit<IRegisterForm, 'passwordRepeat'>

export const RegisterFormInit: IRegisterForm = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  passwordRepeat: '',
  phone: '',
};

const MIN_PHONE = 10;
const MAX_PHONE = 15;
export const LOGIN_REGEX = /(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d_-]{2,19}/;
export const NAME_REGEX = /(?=.*[A-Za-zА-ЯЁё]$)[A-ZА-ЯЁ][A-Za-zА-ЯЁё_-]+/;
export const PHONE_REGEX = /\+?\d{9,14}/;
export const PASSWORD_REGEX = /(?=.*?[A-ZА-ЯЁ])(?=.*?[a-zа-яё])(?=.*?[0-9]).{8,40}/;
export const RegisterValidationModel = z.object({
  first_name: z.string().min(1, 'Поле Имя не может быть пустым')
    .regex(NAME_REGEX, `Имя может содержать латиницу или кириллицу, 
    первая буква должна быть заглавной, без пробелов и без цифр, 
    нет спецсимволов (допустим только дефис)`),
  second_name: z.string().min(1, 'Поле Фамилия не может быть пустым')
    .regex(NAME_REGEX, `Фамилия может содержать латиницу или кириллицу, 
    первая буква должна быть заглавной, без пробелов и без цифр, 
    нет спецсимволов (допустим только дефис)`),
  login: z.string()
    .min(MIN_LOGIN, `Логин не может быть короче ${MIN_LOGIN} символов`)
    .regex(LOGIN_REGEX, `Логин должен содержать от 3 до 20 символов,
     латиница, может содержать цифры, без пробелов,
      без спецсимволов (допустимы дефис и нижнее подчёркивание)`),
  password: z.string().min(MIN_PASSWORD, `Пароль не может быть короче ${MIN_PASSWORD} символов`)
    .regex(PASSWORD_REGEX, `Пароль может содержать от 8 до 40 символов,
     обязательно хотя бы одна заглавная буква и цифра`),
  email: z.string().email('Введите корректный Email'),
  phone: z.string()
    .min(MIN_PHONE, `Телефон не может быть короче ${MIN_PASSWORD} символов`)
    .max(MAX_PHONE, `Телефон не может быть длиннее ${MIN_PASSWORD} символов`)
    .regex(PHONE_REGEX, `Телефон должен содержать от 10 до 15 символов,
     состоять из цифр, может начинается с плюса.`),
});
