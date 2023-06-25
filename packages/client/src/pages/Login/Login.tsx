import { Link } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import { useTheme } from 'styled-components';
import { toFormikValidate } from 'zod-formik-adapter';
import { LogIn } from '@components/Auth/slice';
import {
  BorderedFormBlock,
  BtnText,
  FormContainer,
  FullScreenCenteredContainer,
  H1,
  Input,
  LoaderBtnContainer,
  SubmitButton,
} from '../../styles';
import { LoginValidationModel } from '../../interface';
import Loader from '../../components/Loader';
import { LoaderSizeEnum } from '../../enum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector((state) => state.auth);

  return (
    <FullScreenCenteredContainer>
      <BorderedFormBlock>
        <H1>Вход</H1>
        <Formik
          initialValues={{ login: '', password: '' }}
          validate={toFormikValidate(LoginValidationModel)}
          onSubmit={(values) => {
            dispatch(LogIn(values));
          }}>
          {({ handleSubmit }) => (
            <FormContainer onSubmit={handleSubmit}>
              <Input placeholder="Логин" name="login" type="text" />
              <ErrorMessage name="login" />
              <Input type="password" placeholder="Пароль" name="password" />
              <ErrorMessage name="password" />
              <Link to="/signup">У вас нет аккаунта? Регистрация</Link>
              <SubmitButton type="submit" disabled={isFetching}>
                <BtnText style={{ opacity: isFetching ? '0' : '1' }}>
                  Войти
                </BtnText>
                {isFetching && (
                  <LoaderBtnContainer>
                    <Loader
                      color={theme.colors.onBackground}
                      size={LoaderSizeEnum.small}
                    />
                  </LoaderBtnContainer>
                )}
              </SubmitButton>
            </FormContainer>
          )}
        </Formik>
      </BorderedFormBlock>
    </FullScreenCenteredContainer>
  );
}

export default Login;
