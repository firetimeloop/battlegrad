import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Profile from '../../pages/Profile';
import Game from '../../pages/Game';
import GameOver from '../../pages/GameOver';
import Forum from '../../pages/Forum';
import Leaderboard from '../../pages/Leaderboard';
import Error500 from '../../pages/Error500';
import Error404 from '../../pages/Error404';

import { AppWrapper } from './styles';

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
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="game" element={<Game />} />
        <Route path="game-over" element={<GameOver />} />
        <Route path="forum" element={<Forum />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="error-500" element={<Error500 />} />
        <Route path="error-404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
