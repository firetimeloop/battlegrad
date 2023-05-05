import { useEffect } from 'react';

import Layout from '../Layout';

import { AppWrapper } from './styles';
import { Router } from '../Router';

// Пока без SSR пропишу явно
const __SERVER_PORT__ = 3001;

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <AppWrapper>
      <Layout />
      <Router />
    </AppWrapper>
  );
}

export default App;
