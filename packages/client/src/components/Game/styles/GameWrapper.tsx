import styled from 'styled-components';

export const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
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
