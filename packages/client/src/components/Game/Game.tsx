import { useEffect, useRef } from 'react';

import { GameWrapper, GameScreen } from './styles';
import { initGame } from './utils/initGame';

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const game = initGame(canvasRef.current);

    return () => {
      game?.endGame();
    };
  }, []);

  return (
    <GameWrapper className="tank-bg">
      <GameScreen>
        <canvas ref={canvasRef} />
      </GameScreen>
    </GameWrapper>
  );
}

export default Game;
