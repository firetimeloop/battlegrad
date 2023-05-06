import { Game } from './game';
import { Level } from './level';
import { LevelView } from './levelView';
import { Sprite } from './sprite';
import levels from '../../../assets/levelsData.json';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';

const sprite = new Sprite('/sprite.png');

export function initGame(canvas: HTMLCanvasElement | null): Game | undefined {
  if (!canvas) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  canvas.width = CANVAS_WIDTH;
  // eslint-disable-next-line no-param-reassign
  canvas.height = CANVAS_HEIGHT;

  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  const game = new Game(
    new Level(),
    new LevelView(
      canvas,
      context,
      sprite,
    ),
    levels,
  );

  game.startGame();

  return game;
}
