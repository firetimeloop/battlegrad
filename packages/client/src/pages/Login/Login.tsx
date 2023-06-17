import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import { toFormikValidate } from 'zod-formik-adapter';
import { LogIn } from '@components/Auth/slice';
import {
  BtnText,
  FormContainer,
  LoaderBtnContainer,
  LoginBlock,
  LoginContainer,
  SubmitButton,
} from './styles';
import { H1, Input } from '../../styles';
import { LoginValidationModel } from '../../interface';
import Loader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.auth);

  return (
    <LoginContainer>
      <LoginBlock>
        <H1>Вход</H1>
        <Formik
          initialValues={{ login: '', password: '' }}
          validate={toFormikValidate(LoginValidationModel)}
          onSubmit={(values) => {
            dispatch(LogIn(values));
          }}
        >
          {({
            handleSubmit,
          }) => (
            <FormContainer onSubmit={handleSubmit}>
              <Input
                placeholder="Логин"
                name="login"
                type="text"
              />
              <ErrorMessage name="login" />
              <Input
                type="password"
                placeholder="Пароль"
                name="password"
              />
              <ErrorMessage name="password" />
              <Link to="/signup">У вас нет аккаунта? Регистрация</Link>
              <SubmitButton type="submit" disabled={isFetching}>
                <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                  Войти
                </BtnText>
                {isFetching && (
                  <LoaderBtnContainer>
                    <Loader color={theme!.color.white} size={LoaderSizeEnum.small} />
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
