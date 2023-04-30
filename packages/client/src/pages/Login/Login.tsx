import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import {
  BtnText, FormContainer, LoaderBtnContainer, LoginBlock, LoginContainer, SubmitButton,
} from './styles';
import { H2, Input } from '../../styles';
import { IKeyStringObject } from '../../interface';
import MiniLoader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LogIn } from '../../components/Auth/slice';

function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.auth);

  return (
    <LoginContainer>
      <LoginBlock>
        <H2>Вход</H2>
        <Formik
          initialValues={{ login: '', password: '' }}
          validate={(values) => {
            const errors: IKeyStringObject = {};

            if (values.login.length < 4) {
              errors.login = 'Логин не может быть короче 4 символов';
            }
            if (values.password.length < 4) {
              errors.password = 'Пароль не может быть короче 4 символов';
            }

            return errors;
          }}
          onSubmit={(values) => {
            dispatch(LogIn(values));
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            handleBlur,
          }) => (
            <FormContainer onSubmit={handleSubmit}>
              <Input
                placeholder="Логин"
                name="login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
              />
              <ErrorMessage name="login" />
              <Input
                type="password"
                placeholder="Пароль"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              <ErrorMessage name="password" />
              <Link to="/signup">У вас нет аккаунта? Регистрация</Link>
              <SubmitButton type="submit" disabled={isFetching}>
                <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                  Авторизация
                </BtnText>
                {isFetching && (
                <LoaderBtnContainer>
                  <MiniLoader color={theme.color.white} size={LoaderSizeEnum.small} />
                </LoaderBtnContainer>
                )}
              </SubmitButton>

            </FormContainer>
          )}
        </Formik>
      </LoginBlock>
    </LoginContainer>
  );
}

export default Login;
