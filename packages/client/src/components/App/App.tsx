import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GetTheme } from '@components/ThemeSwitcher/api/theme';
import Layout from '../Layout';
import logo from '../../../public/logo.png';

import { AppWrapper } from './styles';
import { Router } from '../Router';
import Alert from '../Alert';
import { darkTheme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// Пока без SSR пропишу явно
const __SERVER_PORT__ = 3001;

function App() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const loggedIn = !!user;
  const [selectedTheme, setSelectedTheme] = useState(darkTheme);

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();

    const savedTheme = localStorage.getItem('theme');

    if (user) {
      dispatch(GetTheme({ userId: user.id, setSelectedTheme }));
    } else if (savedTheme) {
      setSelectedTheme(JSON.parse(savedTheme));
    }
  }, [dispatch, user]);

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
        <Router />
        <Alert />
        <div />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
