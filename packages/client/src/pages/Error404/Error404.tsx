import { NotFoundContainer, NotFoundContent } from '@pages/Error404/styles';
import { NavLink } from '@components/Layout/styles';

function Error404() {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <h1>404</h1>
        <h2>Кажется, вы не туда попали!</h2>
        <NavLink to="/game">Верните меня назад</NavLink>
      </NotFoundContent>
    </NotFoundContainer>
  );
}

export default Error404;
