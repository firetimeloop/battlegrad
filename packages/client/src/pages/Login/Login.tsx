import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import { toFormikValidate } from 'zod-formik-adapter';
import { LogIn } from '@components/Auth/slice';
import { useEffect } from 'react';
import {
  BorderedFormBlock,
  BtnText,
  DividerContainer,
  DividerLine,
  DividerText,
  FormContainer,
  FullScreenCenteredContainer,
  H1,
  Input,
  LoaderBtnContainer,
  OauthButton,
  SubmitButton,
} from '../../styles';
import { LoginValidationModel } from '../../interface';
import Loader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import YandexLogo from './YandexLogo';
import { CLIENT_ID, REDIRECT_URI, TEST_LOGIN, TEST_PASSWORD } from '../../app/api';

function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {
    isFetching,
    // service_id,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      // @TODO API Практикум пока не работает, для oauth используем тестового юзера
      // dispatch(OauthLogin({ redirect_uri: REDIRECT_URI, code }));

      dispatch(LogIn({
        login: TEST_LOGIN,
        password: TEST_PASSWORD,
      })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          params.delete('code');
        }
      });
    }
  }, [dispatch]);

  // @TODO API Практикум пока не работает, если заработает вернем
  // useEffect(() => {
  //   if (service_id) {
  //     window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${
  //       CLIENT_ID}&redirect_uri=${REDIRECT_URI}`);
  //   }
  // }, [service_id]);

  const oauthSubmit = () => {
    // @TODO API Практикум пока не работает, если заработает вернем
    // dispatch(GetOauthServiceId({ redirectUri: REDIRECT_URI }))

    window.location.replace(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${
        CLIENT_ID}&redirect_uri=${REDIRECT_URI}`);
  };

  return (
    <FullScreenCenteredContainer>
      <BorderedFormBlock>
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
              <DividerContainer>
                <DividerLine />
                <DividerText>
                  или
                </DividerText>
                <DividerLine />
              </DividerContainer>
              <OauthButton
                onClick={oauthSubmit}
                type="button"
                disabled={isFetching}>
                {!isFetching && <YandexLogo />}
                <BtnText hidden={isFetching}>
                  Войти с Яндекс ID
                </BtnText>
                {isFetching && (
                  <LoaderBtnContainer>
                    <Loader color={theme!.color.white} size={LoaderSizeEnum.small} />
                  </LoaderBtnContainer>
                )}
              </OauthButton>
            </FormContainer>
          )}
        </Formik>
      </BorderedFormBlock>
    </FullScreenCenteredContainer>
  );
}

export default Login;
