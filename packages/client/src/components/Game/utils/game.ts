import { Level } from './level';
import { LevelView } from './levelView';

export enum MOVE_CONTROL_KEYS {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}

export enum SPECIAL_CONTROL_KEYS {
  SPACE = 'Space',
  ENTER = 'Enter',
}

export enum TANK_MOVE_DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export const moveControlKeysToTankMoveDirection = (
  moveControlKey: MOVE_CONTROL_KEYS,
): TANK_MOVE_DIRECTION => {
  switch (moveControlKey) {
    case MOVE_CONTROL_KEYS.UP: {
      return TANK_MOVE_DIRECTION.UP;
    }

    case MOVE_CONTROL_KEYS.DOWN: {
      return TANK_MOVE_DIRECTION.DOWN;
    }

    case MOVE_CONTROL_KEYS.LEFT: {
      return TANK_MOVE_DIRECTION.LEFT;
    }

    case MOVE_CONTROL_KEYS.RIGHT: {
      return TANK_MOVE_DIRECTION.RIGHT;
    }

    default:
      return TANK_MOVE_DIRECTION.DOWN;
  }
};

export type CONTROL_KEYS = MOVE_CONTROL_KEYS | SPECIAL_CONTROL_KEYS;

const MOVE_CONTROL_KEYS_VALUES = Object.values(MOVE_CONTROL_KEYS).reduce(
  (acc, current) => {
    acc[current] = true;
    return acc;
  },
  {} as Record<MOVE_CONTROL_KEYS, boolean>,
);

const SPECIAL_CONTROL_KEYS_VALUES = Object.values(SPECIAL_CONTROL_KEYS).reduce(
  (acc, current) => {
    acc[current] = true;
    return acc;
  },
  {} as Record<SPECIAL_CONTROL_KEYS, boolean>,
);

export const isControlKeyCode = (code: string): code is MOVE_CONTROL_KEYS => {
  if (code in MOVE_CONTROL_KEYS_VALUES) {
    return true;
  }
  return false;
};

const isSpecialControlKeyCode = (
  code: string,
): code is SPECIAL_CONTROL_KEYS => {
  if (code in SPECIAL_CONTROL_KEYS_VALUES) {
    return true;
  }
  return false;
};

export type LastControlKey = {
  lastKey?: CONTROL_KEYS;
};

// Контроллер уровня и игры в целом
export class Game {
  private animationId: number | null = null;

  private activeControlKeys: Set<CONTROL_KEYS> = new Set();

  private lastControlKey: LastControlKey = {};

  constructor(
    private level: Level,
    private levelView: LevelView,
    private allLevels: number[][][],
  ) {
    this.animate = this.animate.bind(this);
    this.initKeyDownControls = this.initKeyDownControls.bind(this);
    this.initKeyUpControls = this.initKeyUpControls.bind(this);
  }

  initControls() {
    document.addEventListener('keydown', (event) => {
      const { code } = event;
      if (!isControlKeyCode(code)) {
        return;
      }
      this.activeControlKeys.add(code);
      this.lastControlKey.lastKey = code;
    });

    document.addEventListener('keyup', (event) => {
      const { code } = event;

      if (isSpecialControlKeyCode(code)) {
        this.activeControlKeys.add(code);
        return;
      }

      if (!isControlKeyCode(code)) {
        return;
      }

      this.activeControlKeys.delete(code);
    });
  }

  initKeyDownControls(code: string) {
    if (!isControlKeyCode(code)) {
      return;
    }
    this.activeControlKeys.add(code);
    this.lastControlKey.lastKey = code;
  }

  initKeyUpControls(code: string) {
    if (isSpecialControlKeyCode(code)) {
      this.activeControlKeys.add(code);
      return;
    }

    if (!isControlKeyCode(code)) {
      return;
    }

    this.activeControlKeys.delete(code);
  }

  async startGame() {
    await this.levelView.init(this.initKeyDownControls, this.initKeyUpControls);
    this.level.setLevel(this.allLevels[0]);

    this.initControls();

    this.animate();
  }

  animate() {
    this.level.update(this.activeControlKeys, this.lastControlKey);
    this.levelView.update(this.level);
    this.animationId = requestAnimationFrame(this.animate);
  }

  endGame() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
