import { PartialPosition, Position, Sprite } from './types';

import { CELL_SIZE } from './consts';

import { MOVE_CONTROL_KEYS, CONTROL_KEYS } from './game';
import { getNextPosition } from './getNextPosition';

const {
  DOWN,
  UP,
  LEFT,
  RIGHT,
} = MOVE_CONTROL_KEYS;

const CONTROL_TO_SPRITE_CODE = {
  [DOWN]: 4,
  [UP]: 0,
  [LEFT]: 2,
  [RIGHT]: 6,
};

export class Tank {
  private x = 0;

  private y = 0;

  private spriteCode = 0;

  private isNextFrame = false;

  private cooldown = 0;

  get position(): Position {
    return {
      x: this.x,
      y: this.y,
    };
  }

  set position({ x, y }: PartialPosition) {
    if (x !== undefined && x >= 0) {
      this.x = x;
    }
    if (y !== undefined && y >= 0) {
      this.y = y;
    }
  }

  get sprite(): Sprite {
    return [(this.spriteCode + +this.isNextFrame) * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE];
  }

  get canShoot(): boolean {
    return this.cooldown === 0;
  }

  shoot(): void {
    this.cooldown = 60;
  }

  setSpriteCode(code: number) {
    this.spriteCode = code;
  }

  toggleIsNextFrame() {
    this.isNextFrame = !this.isNextFrame;
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
      this.position = getNextPosition(this.position, activeKey);
      this.toggleIsNextFrame();
    }

    if (activeKey) {
      this.setSpriteCode(CONTROL_TO_SPRITE_CODE[activeKey]);
    }

    if (this.cooldown) {
      this.cooldown -= 1;
    }
  }
}
