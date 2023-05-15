import { PartialPosition, Position, Sprite } from './types';

import { CELL_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';

import { MOVE_CONTROL_KEYS, CONTROL_KEYS } from './game';

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
  private x = 100;

  private y = 100;

  private spriteCode = 0;

  private isNextFrame = false;

  get position(): Position {
    return {
      x: this.x,
      y: this.y,
    };
  }

  set position({ x, y }: PartialPosition) {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
  }

  get sprite(): Sprite {
    return [(this.spriteCode + +this.isNextFrame) * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE];
  }

  get positionMove() {
    const { x: playerX, y: playerY } = this.position;

    return {
      [DOWN]: () => {
        if (this.position.y <= CANVAS_HEIGHT - CELL_SIZE) {
          this.position = {
            y: playerY + 1,
          };
        }
      },
      [UP]: () => {
        this.position = {
          y: playerY - 1,
        };
      },
      [LEFT]: () => {
        this.position = {
          x: playerX - 1,
        };
      },
      [RIGHT]: () => {
        if (this.position.x <= CANVAS_WIDTH - CELL_SIZE) {
          this.position = {
            x: playerX + 1,
          };
        }
      },
    };
  }

  setSpriteCode(code: number) {
    this.spriteCode = code;
  }

  toggleIsNextFrame() {
    this.isNextFrame = !this.isNextFrame;
  }

  update(activeControlKeys: Set<CONTROL_KEYS>) {
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

    if (activeKey) {
      this.positionMove[activeKey]();
      this.setSpriteCode(CONTROL_TO_SPRITE_CODE[activeKey]);
      this.toggleIsNextFrame();
    }
  }
}
