import styled from 'styled-components';

export const GameScreen = styled.div`
  position: relative;
  width: 520px;
  height: 520px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  h1 {
    font-size: 38px;
    color: ${({ theme }) => theme.colors.onBackground};
  }

  canvas {
    transform: scale(250%);
    transform-origin: center;
    ${({ theme }) => {
    if (theme.name === 'lightTheme') {
      return 'filter: invert(1) grayscale(.6) hue-rotate(145deg);';
    }
  }};
  }
`;
