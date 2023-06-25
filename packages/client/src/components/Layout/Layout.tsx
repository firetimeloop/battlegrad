import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import { LogOut } from '@components/Auth/slice';
// import { useTheme } from 'styled-components';
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher';
import { SetStateAction } from 'react';
import { LayoutWrapper, NavLink, NavLinks } from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import logo from '../../../public/logo.png';
// компонент временный для разработки
function Layout({ setSelectedTheme }: { setSelectedTheme: SetStateAction<any>}) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const loggedIn = !!user;
  const navigate = useNavigate();
  // const Theme = useTheme();

  const logOut = () => {
    dispatch(LogOut()).then(() => navigate('/login'));
  };

  return (
    <LayoutWrapper>
      <img src={logo} alt="" width="20%" height="auto" />
      <NavLinks>
        <li>
          <NavLink to="/profile">Профиль</NavLink>
        </li>
        <li>
          <NavLink to="/game">Игра</NavLink>
        </li>
        <li>
          <NavLink to="/forum">Форум</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard">Таблица лидеров</NavLink>
        </li>
        {loggedIn && (
          <li>
            <Button
              style={{ backgroundColor: 'transparent', color: '#8f492e' }}
              onClick={logOut}>
              Выйти
            </Button>
          </li>
        )}
        <ThemeSwitcher setSelectedTheme={setSelectedTheme} />
      </NavLinks>
    </LayoutWrapper>
  );
}

export default Layout;
