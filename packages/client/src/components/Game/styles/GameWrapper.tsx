import styled from 'styled-components';

export const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  min-height: 100px;
  // position: fixed;
  // background: ${({ theme }) => theme.colors.background};
`;

export const GameStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  gap: 20px;
  margin-bottom: 20px;
  width: 520px;

  h2 {
    width: 25%;
  }

  span {
    font-size: 30px;
  }

  .lives {
    color: red;
    font-family: serif;
  }

  .enemies {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
    ${({ theme }) => {
      if (theme.name === 'lightTheme') {
        return 'filter: invert(1) grayscale(.6) hue-rotate(145deg);';
      }
    }}
  }
`;
