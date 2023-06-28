import styled from 'styled-components';

export const Table = styled.table`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 30px;
  padding: 20px;
  color: ${({ theme }) => theme.colors.onBackground};
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

  caption {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.accent};
    padding: 20px;
    margin-bottom: 15px;
  }

  tr {
    th {
      color: ${({ theme }) => theme.colors.accent};
    }

    & > td {
      padding: 10px 50px;
      text-align: center;
    }

    &:last-child {
      td {
        padding-bottom: 0;
      }
    }
  }
`;
