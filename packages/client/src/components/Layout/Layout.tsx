import { Link, useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import { LogOut } from '@components/Auth/slice';
import { LayoutWrapper, NavLinks } from './styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// компонент временный для разработки
function Layout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const loggedIn = !!user;
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(LogOut())
      .then(() => navigate('/login'));
  };

  return (
    <LayoutWrapper>
      <NavLinks>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/game-over">Game Over</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/error-500">Error 500</Link>
        </li>
        <li>
          <Link to="/error-404">Error 404</Link>
        </li>
        <li>
          <Link to="/nothing-here">Nothing Here</Link>
        </li>
        {loggedIn && (
        <li>
          <Button onClick={logOut}>Выйти</Button>
        </li>
        )}
      </NavLinks>
    </LayoutWrapper>
  );
}

export default Layout;
