import styled from 'styled-components';

export const GameInfo = styled.div`
  position: absolute;
  top: 0;
  left: -300px;
  width: 270px;
  color: ${({ theme }) => theme.colors.onBackground};

  section {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    width: 180px;
    margin-left: 15px;
    color: ${({ theme }) => theme.colors.onBackground};
  }

  span {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.accent};
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.onBackground};
    border-radius: 5px;
    display: inline-block;
  }
`;
