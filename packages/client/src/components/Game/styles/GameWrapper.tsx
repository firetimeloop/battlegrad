import styled from 'styled-components';

export const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #60645F;
  min-width: 100px;
  min-height: 100px;
`;

export const GameLogo = styled.div`
  width: 750px;
  height: 150px;
  display: flex;
  background-image: url('battlegrad.png');
  background-position: center;
  position: fixed;
  left: 50%;
  top: 32px;
  transform: translateX(-50%);
  backdrop-filter: blur(5px);
`;
