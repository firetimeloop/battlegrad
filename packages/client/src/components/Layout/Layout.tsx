import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import { LogOut } from '@components/Auth/slice';
import { useTheme } from 'styled-components';
import { LayoutWrapper, NavLink, NavLinks } from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// компонент временный для разработки
function Layout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const loggedIn = !!user;
  const navigate = useNavigate();
  const Theme = useTheme();

  const logOut = () => {
    dispatch(LogOut())
      .then(() => navigate('/login'));
  };

  return (
    <LayoutWrapper>
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
            style={{ backgroundColor: Theme!.color.background.orange }}
            onClick={logOut}>
            Выйти
          </Button>
        </li>
        )}
      </NavLinks>
    </LayoutWrapper>
  );
}

export default Layout;
