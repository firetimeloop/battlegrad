import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 550px;
  text-align: center;
  color: ${({ theme }) => theme.colors.onBackground};
  h1 {
    font-size: 110px;
  }
  h2 {
    font-size: 36px;
    color: ${({ theme }) => theme.colors.accent};
  }
  a {
    text-decoration: underline;
  }
`;
