import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { LoaderContainer } from '@components/Loader/styles';
import Loader from '@components/Loader';
import { GetMe } from '@components/Auth/slice';
import Layout from '../Layout';
import logo from '../../../public/logo.png';

import { AppWrapper } from './styles';
import { Router } from '../Router';
import Alert from '../Alert';
import { darkTheme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LoaderSizeEnum } from '../../enum';
// Пока без SSR пропишу явно
const __SERVER_PORT__ = 3001;

function App() {
  const { user, needFetchUser } = useAppSelector((state) => state.auth);
  const loggedIn = !!user;
  const [selectedTheme, setSelectedTheme] = useState(darkTheme);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setSelectedTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    const request = dispatch(GetMe());
    return () => {
      request.abort();
    };
  }, [dispatch, needFetchUser]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <AppWrapper>
        {loggedIn ? (
          <Layout setSelectedTheme={setSelectedTheme} />
        ) : (
          <img
            src={logo}
            alt=""
            width="700px"
            height="auto"
            className="logo"
            />
        )}
        {needFetchUser
          ? (
            <LoaderContainer>
              <Loader size={LoaderSizeEnum.medium} />
            </LoaderContainer>
          )
          : <Router />}
        <Alert />
        <div />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
