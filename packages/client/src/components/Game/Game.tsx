import { useCallback, useEffect, useRef } from 'react';

import { GameStatus, resetGame, setGameStatus } from '@components/Game/slice';
import Button from '@components/Button';
import { GameScreen, GameStats, GameWrapper } from './styles';
import { initGame } from './utils/initGame';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { H1 } from '../../styles';

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const { player, enemiesDefeated, status } = useAppSelector((store) => store.game);

  useEffect(() => {
    const game = initGame(canvasRef.current);

    return () => {
      game?.endGame();
    };
  }, [status]);

  useEffect(() => {
    if (player.healthCount === 0) {
      dispatch(setGameStatus(GameStatus.gameOver));
    }
  }, [dispatch, player.healthCount]);

  useEffect(() => {
    if (enemiesDefeated > 19) {
      dispatch(setGameStatus(GameStatus.win));
    }
  }, [dispatch, enemiesDefeated]);

  const Content = useCallback(() => {
    switch (status) {
      case GameStatus.gameOver: {
        return (
          <GameScreen>
            <H1>Вы проиграли! 😢</H1>
            <Button onClick={() => dispatch(resetGame())}>Попробовать еще раз</Button>
          </GameScreen>
        );
      }
      case GameStatus.win: {
        return (
          <GameScreen>
            <H1>Вы выиграли! 🥳</H1>
            <Button onClick={() => dispatch(resetGame())}>Сыграть еще</Button>
          </GameScreen>
        );
      }
      case GameStatus.normal: {
        return (
          <GameScreen>
            <canvas ref={canvasRef} />
          </GameScreen>
        );
      }
      default: return null;
    }
  }, [dispatch, status]);

  return (
    <GameWrapper>
      <Content />
      <GameStats>
        <h2>
          Жизни:
          <span>
            {` ${'✖ '.repeat(3 - player.healthCount) + '❤ '.repeat(player.healthCount)}`}
          </span>
        </h2>
        <h3>
          {`Уничтожено противников: ${enemiesDefeated} из 20`}
        </h3>
      </GameStats>
    </GameWrapper>
  );
}

export default Game;
