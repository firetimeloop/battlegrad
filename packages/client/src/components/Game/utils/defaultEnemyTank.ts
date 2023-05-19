import { EnemyTank } from './enemyTank';
import { Position, Sprite } from './types';
import { CELL_SIZE } from './consts';
import { TANK_MOVE_DIRECTION } from './game';

const DEFAULT_ENEMY_TANK_SPRITE_LEVEL = 0;

const DIRECTION_TO_SPRITE_CODE = {
  [TANK_MOVE_DIRECTION.DOWN]: 12,
  [TANK_MOVE_DIRECTION.UP]: 8,
  [TANK_MOVE_DIRECTION.LEFT]: 10,
  [TANK_MOVE_DIRECTION.RIGHT]: 14,
};

export class DefaultEnemyTank extends EnemyTank {
  constructor(spawnPosition: Position) {
    super(spawnPosition, DEFAULT_ENEMY_TANK_SPRITE_LEVEL);
  }

  get sprite(): Sprite {
    return [
      (this.spriteCode + +this.isNextFrame) * CELL_SIZE,
      this.spriteLevel,
      CELL_SIZE,
      CELL_SIZE,
    ];
  }

  override update(canMove: boolean) {
    super.update(canMove);

    this.setSpriteCode(DIRECTION_TO_SPRITE_CODE[this.currentDirection]);
  }
}
