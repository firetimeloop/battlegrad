import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { LoginBlock, LoginContainer, SubmitButton } from './styles';
import { H2, Input } from '../../styles';
import { IKeyStringObject } from '../../interface';

function Login() {
  const [data, setData] = useState({
    login: '',
    password: '',
  });

  return (
    <LoginContainer>
      <LoginBlock>
        <H2>Вход</H2>

        <Formik
          initialValues={{ login: '', password: '' }}
          validate={(values) => {
            const errors: IKeyStringObject = {};

            if (!values.login) {
              errors.email = 'Логин не может быть пустым';
            }
            if (!values.password) {
              errors.email = 'Пароль не может быть пустым';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />

              <ErrorMessage name="email" component="div" />

              <Field type="password" name="password" />

              <ErrorMessage name="password" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Input
          placeholder="Логин"
          value={data.login}
          onChange={(e) => {
            setData({
              ...data,
              login: e.currentTarget.value,
            });
          }}
        />
        <Input
          placeholder="Пароль"
          value={data.password}
          onChange={(e) => {
            setData({
              ...data,
              password: e.currentTarget.value,
            });
          }}
        />
        <Link to="/signup">У вас нет аккаунта? Регистрация</Link>
        <SubmitButton>Авторизация</SubmitButton>
      </LoginBlock>
    </LoginContainer>
  );
}

export default Login;
