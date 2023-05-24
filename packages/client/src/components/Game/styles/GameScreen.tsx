import styled from 'styled-components';

export const GameScreen = styled.div`
  width: 520px;
  height: 520px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 150px;

  canvas {
    transform: scale(250%);
    transform-origin: center;
  }
`;
