import { useCallback, useEffect, useRef } from 'react';

import { GameStatus, resetGame, setGameStatus } from '@components/Game/slice';
import { addLeader } from '@components/Leaderboard/slice';
import Button from '@components/Button';
import { GameScreen, GameStats, GameWrapper } from './styles';
import { initGame } from './utils/initGame';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGameState, selectLeaderboardState } from '../../app/selectors';
import toggleFullScreen from '../../utils/toggleFullScreen';
import { H1, Emoji } from '../../styles';

import enemyImg from '../../../public/enemy.png';
import explosionImg from '../../../public/explosion.png';
import { GameInfo } from './styles/GameInfo';

const ENTER_CODE = 13;

const handleFullScreenToggle = (e: KeyboardEvent) => {
  if (e.keyCode === ENTER_CODE) {
    toggleFullScreen();
  }
};

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const { player, enemiesDefeated, status } = useAppSelector(selectGameState);
  const { isSendLeaderAvailable } = useAppSelector(selectLeaderboardState);

  useEffect(() => {
    document.addEventListener('keydown', handleFullScreenToggle);

    return () => {
      document.removeEventListener('keydown', handleFullScreenToggle);
    };
  }, []);

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
            <H1>Вы проиграли!</H1>
            <Emoji>😢</Emoji>
            <Button onClick={() => dispatch(resetGame())}>
              Попробовать еще раз
            </Button>
          </GameScreen>
        );
      }
      case GameStatus.win: {
        return (
          <GameScreen>
            <H1>Вы выиграли!</H1>
            <Emoji>🥳</Emoji>
            <Button onClick={() => dispatch(resetGame())}>Сыграть еще</Button>
          </GameScreen>
        );
      }
      case GameStatus.normal: {
        return (
          <GameScreen>
            <GameInfo>
              <section>
                <span>Enter</span>
                <p> для перехода в полноэкранный режим</p>
              </section>
              <section>
                <span>Esc</span>
                <p> для вызова меню</p>
              </section>
            </GameInfo>
            <canvas id="game" ref={canvasRef} />
          </GameScreen>
        );
      }
      default:
        return null;
    }
  }, [dispatch, status]);

  return (
    <GameWrapper>
      {status === GameStatus.normal && (
        <GameStats>
          <h2>
            <span className="lives">
              {` ${'❤ '.repeat(player.healthCount)}`}
            </span>
          </h2>
          <div className="enemies">
            {[...Array(20).keys()].map((i) => {
              if (i < enemiesDefeated) {
                return (
                  <img width="32px" height="32px" src={explosionImg} alt="" key={i} />
                );
              }
              return (
                <img width="32px" height="32px" src={enemyImg} alt="" key={i} />
              );
            })}
          </div>
        </GameStats>
      )}
      <Content />
    </GameWrapper>
  );
}

export default Game;
