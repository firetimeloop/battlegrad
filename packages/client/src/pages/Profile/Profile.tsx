import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import { toFormikValidate } from 'zod-formik-adapter';
import { UpdateAvatar, UpdatePassword, UpdateProfile } from '@components/Auth/slice';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarContainer,
  AvatarInput,
  AvatarSaveButton,
  EmptyAvatar,
} from '@pages/Profile/styles';
import {
  BorderedFormBlock,
  BtnText,
  Button,
  FormContainer,
  FullScreenCenteredContainer,
  H1,
  Input,
  LoaderBtnContainer,
  RowGap10,
  SubmitButton,
} from '../../styles';
import Loader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { validateConfirmPassword } from '../../utils/password';
import {
  ChangePasswordInit,
  IProfileChange,
  PasswordChangeValidationModel,
  ProfileChangeInit,
  ProfileChangeValidationModel,
} from '../../interface/Profile';
import { yandexBaseUrl } from '../../app/api';

enum ProfileMode {
  normal,
  profileChange,
  passwordChange,
  avatarChange,
}

function Profile() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching, user } = useAppSelector((state) => state.auth);
  const [mode, setMode] = useState(ProfileMode.normal);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [userLocal, setUserLocal] = useState<IProfileChange>(ProfileChangeInit);

  useEffect(() => {
    if (user) {
      const {
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
      } = user;

      setUserLocal({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
      });
      setNewAvatar(null);
      setMode(ProfileMode.normal);
    }
  }, [user]);

  if (!user) {
    return <div />;
  }

  const cancel = () => {
    setMode(ProfileMode.normal);
  };

  return (
    <FullScreenCenteredContainer>
      <BorderedFormBlock style={{ gap: 5 }}>
        <H1>Профиль</H1>

        <AvatarContainer>
          {user.avatar
            ? <Avatar alt="profile avatar" src={`${yandexBaseUrl}/resources${user.avatar}`} />
            : <EmptyAvatar />}
        </AvatarContainer>

        {mode === ProfileMode.avatarChange
          ? (
            <>
              <AvatarInput
                name="avatar"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const file = e.target?.files ? e.target.files[0] : null;
                  if (file) {
                    setNewAvatar(file);
                  }
                }} />
              <RowGap10>
                <Button type="button" disabled={isFetching} onClick={cancel}>
                  Отмена
                </Button>
                <AvatarSaveButton
                  onClick={() => {
                    if (newAvatar) {
                      const form = new FormData();
                      form.append('avatar', newAvatar);
                      dispatch(UpdateAvatar(form));
                    }
                  }}
                  disabled={!newAvatar}>
                  Сохранить
                </AvatarSaveButton>
              </RowGap10>
            </>
          )
          : (
            <Button
              onClick={() => setMode(ProfileMode.avatarChange)}>
              Изменить аватар
            </Button>
          )}

        {mode === ProfileMode.profileChange ? (
          <Formik
            initialValues={userLocal}
            validate={toFormikValidate(ProfileChangeValidationModel)}
            onSubmit={(values) => {
              dispatch(UpdateProfile(values));
            }}
        >
            {({
              handleSubmit,
            }) => (
              <FormContainer style={{ gap: 5 }} onSubmit={handleSubmit}>
                <Input
                  placeholder="Имя"
                  name="first_name"
                  type="text"
              />
                <ErrorMessage name="first_name" />
                <Input
                  placeholder="Фамилия"
                  name="second_name"
                  type="text"
              />
                <ErrorMessage name="second_name" />
                <Input
                  placeholder="Отображаемое имя"
                  name="display_name"
                  type="text"
              />
                <ErrorMessage name="display_name" />
                <Input
                  placeholder="Логин"
                  name="login"
                  type="text"
              />
                <ErrorMessage name="login" />
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
              />
                <ErrorMessage name="email" />
                <Input
                  placeholder="Телефон"
                  name="phone"
                  type="tel"
              />
                <ErrorMessage name="phone" />
                <RowGap10>
                  <Button type="button" disabled={isFetching} onClick={cancel}>
                    Отмена
                  </Button>
                  <SubmitButton type="submit" disabled={isFetching}>
                    <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                      Сохранить
                    </BtnText>
                    {isFetching && (
                    <LoaderBtnContainer>
                      <Loader color={theme.color.white} size={LoaderSizeEnum.small} />
                    </LoaderBtnContainer>
                    )}
                  </SubmitButton>
                </RowGap10>

              </FormContainer>
            )}
          </Formik>
        )
          : (
            <>
              <RowGap10>
                <h4>Имя:</h4>
                <p>{userLocal.first_name}</p>
              </RowGap10>
              <RowGap10>
                <h4>Фамилия:</h4>
                <p>{userLocal.second_name}</p>
              </RowGap10>
              <RowGap10>
                <h4>Отображаемое имя:</h4>
                <p>{userLocal.display_name}</p>
              </RowGap10>
              <RowGap10>
                <h4>Логин:</h4>
                <p>{userLocal.login}</p>
              </RowGap10>
              <RowGap10>
                <h4>E-mail:</h4>
                <p>{userLocal.email}</p>
              </RowGap10>
              <RowGap10>
                <h4>Телефон:</h4>
                <p>{userLocal.phone}</p>
              </RowGap10>
              <Button type="button" onClick={() => setMode(ProfileMode.profileChange)}>
                Изменить профиль
              </Button>
            </>
          )}
        {mode === ProfileMode.passwordChange ? (
          <Formik
            initialValues={ChangePasswordInit}
            validate={toFormikValidate(PasswordChangeValidationModel)}
            onSubmit={({ oldPassword, newPassword }) => {
              dispatch(UpdatePassword({ oldPassword, newPassword }));
            }}
        >
            {({
              handleSubmit,
              values,
            }) => (
              <FormContainer onSubmit={handleSubmit}>
                <Input
                  type="oldPassword"
                  placeholder="Старый пароль"
                  name="oldPassword"
              />
                <ErrorMessage name="oldPassword" />
                <Input
                  type="newPassword"
                  placeholder="Новый пароль"
                  name="newPassword"
              />
                <ErrorMessage name="newPassword" />
                <Input
                  type="newPasswordRepeat"
                  placeholder="Повторите новый пароль"
                  name="newPasswordRepeat"
                  validate={(value: string) => validateConfirmPassword(values.newPassword, value)}
              />
                <ErrorMessage name="newPasswordRepeat" />
                <RowGap10>
                  <Button type="button" disabled={isFetching} onClick={cancel}>
                    Отмена
                  </Button>
                  <SubmitButton type="submit" disabled={isFetching}>
                    <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                      Сохранить
                    </BtnText>
                    {isFetching && (
                    <LoaderBtnContainer>
                      <Loader color={theme.color.white} size={LoaderSizeEnum.small} />
                    </LoaderBtnContainer>
                    )}
                  </SubmitButton>
                </RowGap10>
              </FormContainer>
            )}
          </Formik>
        ) : <Button onClick={() => setMode(ProfileMode.passwordChange)}>Изменить пароль</Button>}

      </BorderedFormBlock>
    </FullScreenCenteredContainer>
  );
}

export default Profile;
