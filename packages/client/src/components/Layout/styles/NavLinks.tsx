import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.onBackground};
  text-decoration: none;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 60px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: 0.3s;
  transform: all;

  :hover {
    filter: brightness(0.7);
  }

  :active {
    filter: brightness(0.9);
  }

  :disabled {
    filter: brightness(0.3);
  }
`;
