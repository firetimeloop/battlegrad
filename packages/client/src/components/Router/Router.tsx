import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { PrivateLoggedRoute } from './privateRoute/PrivateLoggedRoute';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import Game from '../../pages/Game';
import GameOver from '../../pages/GameOver';
import Forum from '../../pages/Forum';
import Leaderboard from '../../pages/Leaderboard';
import Error500 from '../../pages/Error500';
import Error404 from '../../pages/Error404';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import { GetMe } from '../Auth/slice';

export function Router() {
  const { user, needFetchUser } = useAppSelector((state) => state.auth);
  const loggedIn = !!user;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const request = dispatch(GetMe());
    return () => {
      request.abort();
    };
  }, [dispatch, needFetchUser]);

  return (
    <Routes>
      <Route path="/login" element={<PrivateLoggedRoute loggedIn={loggedIn} />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/signup" element={<PrivateLoggedRoute loggedIn={loggedIn} />}>
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route path="/game" element={<PrivateRoute loggedIn={loggedIn} />}>
        <Route index path="/game" element={<Game />} />
      </Route>

      <Route path="/profile" element={<PrivateRoute loggedIn={loggedIn} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/game-over" element={<PrivateRoute loggedIn={loggedIn} />}>
        <Route path="/game-over" element={<GameOver />} />
      </Route>

      <Route path="/forum" element={<PrivateRoute loggedIn={loggedIn} />}>
        <Route path="/forum" element={<Forum />} />
      </Route>

      <Route path="/leaderboard" element={<PrivateRoute loggedIn={loggedIn} />}>
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>

      <Route
        path="/"
        element={loggedIn
          ? <Navigate to="/game" replace />
          : (
            <Navigate
              to={{ pathname: '/login', search: window.location.search }}
              replace />
          )}
      />

      <Route path="/error-500" element={<Error500 />} />
      <Route path="/error-404" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
