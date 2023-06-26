import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import { toFormikValidate } from 'zod-formik-adapter';
import { CreateUser } from '@components/Auth/slice';
import {
  RegisterBlock,
  RegisterBlockContent,
  RegisterForm,
  RegisterImage,
} from '@pages/Register/styles';
import React from 'react';
import {
  H1,
  Input,
  BtnText,
  LoaderBtnContainer,
  FullScreenCenteredContainer,
  SubmitButton,
} from '../../styles';
import Loader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  RegisterFormInit,
  RegisterValidationModel,
} from '../../interface/Register';
import { validateConfirmPassword } from '../../utils/password';

function Register() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.auth);

  return (
    <FullScreenCenteredContainer>
      <RegisterBlock>
        <RegisterImage />
        <RegisterBlockContent>
          <H1>Регистрация</H1>
          <Formik
            initialValues={RegisterFormInit}
            validate={toFormikValidate(RegisterValidationModel)}
            onSubmit={(values) => {
              dispatch(CreateUser(values));
            }}>
            {({ handleSubmit, values }) => (
              <RegisterForm onSubmit={handleSubmit}>
                <Input placeholder="Логин" name="login" type="text" />
                <ErrorMessage name="login" />
                <Input placeholder="Email" name="email" type="email" />
                <ErrorMessage name="email" />
                <Input placeholder="Имя" name="first_name" type="text" />
                <ErrorMessage name="first_name" />
                <Input placeholder="Фамилия" name="second_name" type="text" />
                <ErrorMessage name="second_name" />
                <Input placeholder="Телефон" name="phone" type="tel" />
                <ErrorMessage name="phone" />
                <Input type="password" placeholder="Пароль" name="password" />
                <ErrorMessage name="password" />
                <Input
                  type="password"
                  placeholder="Повторите пароль"
                  name="passwordRepeat"
                  validate={(value: string) =>
                    validateConfirmPassword(values.password, value)}
                />
                <ErrorMessage name="passwordRepeat" />
                <Link to="/login">Уже зарегистрированы? Войти</Link>
                <SubmitButton type="submit" disabled={isFetching}>
                  <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                    Зарегистрироваться
                  </BtnText>
                  {isFetching && (
                    <LoaderBtnContainer>
                      <Loader
                        color={theme!.colors.background}
                        size={LoaderSizeEnum.small}
                      />
                    </LoaderBtnContainer>
                  )}
                </SubmitButton>
              </RegisterForm>
            )}
          </Formik>
        </RegisterBlockContent>
      </RegisterBlock>
    </FullScreenCenteredContainer>
  );
}

export default Register;
