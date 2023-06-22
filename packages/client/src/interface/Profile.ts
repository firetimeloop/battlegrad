import { z } from 'zod';
import {
  UserEmailModel,
  UserFirstNameModel,
  UserLoginModel,
  UserPasswordModel,
  UserPhoneModel,
  UserSecondNameModel,
} from './Register';

export const ProfileChangeValidationModel = z.object({
  first_name: UserFirstNameModel,
  second_name: UserSecondNameModel,
  display_name: z.string().nullable(),
  login: UserLoginModel,
  email: UserEmailModel,
  phone: UserPhoneModel,
  avatar: z.string().nullable(),
});

export type IProfileChange = z.infer<typeof ProfileChangeValidationModel>

export type IProfileUpdated = IProfileChange & {id: number}

export type IProfileUpdateResult = IProfileUpdated | {
  reason: string
}

export const ProfileChangeInit: IProfileChange = {
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
};

export const PasswordChangeValidationModel = z.object({
  oldPassword: UserPasswordModel,
  newPassword: UserPasswordModel,
  newPasswordRepeat: UserPasswordModel,
});

export type IChangePassword = z.infer<typeof PasswordChangeValidationModel>
export const ChangePasswordInit: IChangePassword = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
};
export interface IChangePasswordProps {
  oldPassword: string
  newPassword: string
}

export type IUpdatePasswordResult = null | {reason: string}
