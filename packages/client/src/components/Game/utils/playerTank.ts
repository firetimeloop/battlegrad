import { TankType } from '@components/Game/utils/projectile';
import { Tank } from './tank';
import { CELL_SIZE } from './consts';
import { MOVE_CONTROL_KEYS, CONTROL_KEYS, MOVE_DIRECTION } from './game';
import { getNextPosition } from './getNextPosition';
import { Sprite } from './types';

const { DOWN, UP, LEFT, RIGHT } = MOVE_CONTROL_KEYS;

const DIRECTION_TO_SPRITE_CODE = {
  [MOVE_DIRECTION.DOWN]: 4,
  [MOVE_DIRECTION.UP]: 0,
  [MOVE_DIRECTION.LEFT]: 2,
  [MOVE_DIRECTION.RIGHT]: 6,
};

export class PlayerTank extends Tank {
  protected type = TankType.player;

  get sprite(): Sprite {
    return [
      (this.spriteCode + +this.isNextFrame) * CELL_SIZE,
      0,
      CELL_SIZE,
      CELL_SIZE,
    ];
  }

  constructor() {
    super();
    this.position = { x: 4 * CELL_SIZE, y: 12 * CELL_SIZE };
  }

  update(activeControlKeys: Set<CONTROL_KEYS>, withMove: boolean) {
    let activeKey: MOVE_CONTROL_KEYS | null = null;

    if (activeControlKeys.has(DOWN)) {
      activeKey = DOWN;
      this.currentDirection = MOVE_DIRECTION.DOWN;
    } else if (activeControlKeys.has(UP)) {
      activeKey = UP;
      this.currentDirection = MOVE_DIRECTION.UP;
    } else if (activeControlKeys.has(LEFT)) {
      activeKey = LEFT;
      this.currentDirection = MOVE_DIRECTION.LEFT;
    } else if (activeControlKeys.has(RIGHT)) {
      activeKey = RIGHT;
      this.currentDirection = MOVE_DIRECTION.RIGHT;
    }

    if (activeKey && withMove) {
      this.position = getNextPosition(this.position, this.currentDirection);
      this.toggleIsNextFrame();
    }

    this.setSpriteCode(DIRECTION_TO_SPRITE_CODE[this.currentDirection]);
  }
}
