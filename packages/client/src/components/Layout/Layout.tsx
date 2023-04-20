import { Link } from 'react-router-dom';

import { LayoutWrapper, NavLinks } from './styles';

// компонент временный для разработки
function Layout() {
  return (
    <LayoutWrapper>
      <NavLinks>
        <li>
          <Link to="/">Home</Link>
        </li>
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
      </NavLinks>
    </LayoutWrapper>
  );
}

export default Layout;
