import { Tank } from './tank';
import { CELL_SIZE } from './consts';
import { MOVE_CONTROL_KEYS, CONTROL_KEYS, moveControlKeysToTankMoveDirection } from './game';
import { getNextPosition } from './getNextPosition';
import { Sprite } from './types';

const { DOWN, UP, LEFT, RIGHT } = MOVE_CONTROL_KEYS;

const CONTROL_TO_SPRITE_CODE = {
  [DOWN]: 4,
  [UP]: 0,
  [LEFT]: 2,
  [RIGHT]: 6,
};

export class PlayerTank extends Tank {
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
    } else if (activeControlKeys.has(UP)) {
      activeKey = UP;
    } else if (activeControlKeys.has(LEFT)) {
      activeKey = LEFT;
    } else if (activeControlKeys.has(RIGHT)) {
      activeKey = RIGHT;
    }

    if (activeKey && withMove) {
      const tankMoveDirection = moveControlKeysToTankMoveDirection(activeKey);
      this.position = getNextPosition(this.position, tankMoveDirection);
      this.toggleIsNextFrame();
    }

    if (activeKey) {
      this.setSpriteCode(CONTROL_TO_SPRITE_CODE[activeKey]);
    }
  }
}
