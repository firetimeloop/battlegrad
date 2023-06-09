import styled from 'styled-components';

export const Table = styled.table`
  background-color: ${({ theme }) => theme.color.background.lightBlue};
  border-radius: 30px;
  padding: 20px;
  color: ${({ theme }) => theme.color.white};
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;

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
