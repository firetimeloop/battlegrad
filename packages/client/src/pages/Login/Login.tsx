import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import { toFormikValidate } from 'zod-formik-adapter';
import { GetOauthServiceId, LogIn, OauthLogin } from '@components/Auth/slice';
import { useEffect } from 'react';
import {
  BtnText,
  DividerContainer,
  DividerLine,
  DividerText,
  FormContainer,
  LoaderBtnContainer,
  LoginBlock,
  LoginContainer,
  OauthButton,
  SubmitButton,
} from './styles';
import { H1, Input } from '../../styles';
import { LoginValidationModel } from '../../interface';
import Loader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import YandexLogo from './YandexLogo';
import { REDIRECT_URI } from '../../app/api';

function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching, service_id } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      dispatch(OauthLogin({ redirectUri: REDIRECT_URI, code }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (service_id) {
      window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${
        service_id}&redirect_uri=${REDIRECT_URI}`);
    }
  }, [service_id]);

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
                    <Loader color={theme.color.white} size={LoaderSizeEnum.small} />
                  </LoaderBtnContainer>
                )}
              </SubmitButton>
              <DividerContainer>
                <DividerLine />
                <DividerText>
                  или
                </DividerText>
                <DividerLine />
              </DividerContainer>
              <OauthButton
                onClick={() => dispatch(GetOauthServiceId({ redirectUri: REDIRECT_URI }))}
                type="button"
                disabled={isFetching}>
                {!isFetching && <YandexLogo />}
                <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                  Войти с Яндекс ID
                </BtnText>
                {isFetching && (
                  <LoaderBtnContainer>
                    <Loader color={theme.color.white} size={LoaderSizeEnum.small} />
                  </LoaderBtnContainer>
                )}
              </OauthButton>
            </FormContainer>
          )}
        </Formik>
      </LoginBlock>
    </LoginContainer>
  );
}

export default Login;
