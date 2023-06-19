import styled from 'styled-components';

export const Table = styled.table`
  background-color: ${({ theme }) => theme.color.background.lightBlue};
  border-radius: 30px;
  padding: 20px;
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;

  caption {
    font-size: 26px;
    background-color: ${({ theme }) => theme.color.background.lightBlue};
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 30px;
  }

  tr {
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
