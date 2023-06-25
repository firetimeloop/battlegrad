import styled from 'styled-components';

export const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // width: 100vw;
  min-height: 100vh;

  & .logo {
    margin-top: 40px;
  }
`;
