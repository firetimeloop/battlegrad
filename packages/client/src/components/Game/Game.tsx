import { useCallback, useEffect, useRef } from 'react';

import { GameStatus, resetGame, setGameStatus } from '@components/Game/slice';
import { addLeader } from '@components/Leaderboard/slice';
import Button from '@components/Button';
import { GameScreen, GameStats, GameWrapper } from './styles';
import { initGame } from './utils/initGame';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGameState, selectLeaderboardState } from '../../app/selectors';
import { H1 } from '../../styles';

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const { player, enemiesDefeated, status } = useAppSelector(selectGameState);
  const { isSendLeaderAvailable } = useAppSelector(selectLeaderboardState);

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  useEffect(() => {
    const game = initGame(canvasRef.current);

    return () => {
      game?.endGame();
    };
  }, [dispatch, status]);

  useEffect(() => {
    if (player.healthCount === 0) {
      dispatch(setGameStatus(GameStatus.gameOver));
    }
  }, [dispatch, player.healthCount]);

  useEffect(() => {
    if (enemiesDefeated > 19) {
      dispatch(setGameStatus(GameStatus.win));

      if (isSendLeaderAvailable) {
        dispatch(addLeader());
      }
    }
  }, [dispatch, enemiesDefeated, isSendLeaderAvailable]);

  const Content = useCallback(() => {
    switch (status) {
      case GameStatus.gameOver: {
        return (
          <GameScreen>
            <H1>Вы проиграли! 😢</H1>
            <Button onClick={() => dispatch(resetGame())}>
              Попробовать еще раз
            </Button>
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
      default:
        return null;
    }
  }, [dispatch, status]);

  return (
    <GameWrapper>
      <Content />
      {status === GameStatus.normal && (
        <GameStats>
          <h2>
            Жизни:
            <span style={{ color: 'black' }}>
              {` ${'✖ '.repeat(3 - player.healthCount)}`}
            </span>
            <span style={{ color: 'red' }}>
              {` ${'❤ '.repeat(player.healthCount)}`}
            </span>
          </h2>
          <h3>{`Уничтожено противников: ${enemiesDefeated} из 20`}</h3>
        </GameStats>
      )}
    </GameWrapper>
  );
}

export default Game;
