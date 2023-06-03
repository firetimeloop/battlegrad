import styled from 'styled-components';

export const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
  position: relative;
`;

export const GameLogo = styled.div`
  display: flex;
  position: fixed;
  left: 50%;
  top: 55px;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  pointer-events: none;
`;

export const GameStats = styled.div`
  display: flex;
  position: absolute;
  left: 40px;
  top: 50%;
  align-items: start;
  justify-content: center;
  transform: translateY(-50%);
  pointer-events: none;
  gap: 20px;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
  background: rgb(0 0 0 / 40%);
  padding: 10px;
  border-radius: 10px;

  span {
    font-size: 42px;
  }
`;
