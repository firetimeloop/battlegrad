import styled from 'styled-components';

export const ForumContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: ${({ theme }) => theme.colors.onBackground};

  h1 {
    font-size: 50px;
  }
`;
