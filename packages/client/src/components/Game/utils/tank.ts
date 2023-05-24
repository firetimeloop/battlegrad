import { TankType } from '@components/Game/utils/projectile';
import { PartialPosition, Position, Sprite } from './types';
import { MOVE_DIRECTION } from './game';

export abstract class Tank {
  protected x = 0;

  protected y = 0;

  protected spriteCode = 0;

  protected type = TankType.player;

  protected isNextFrame = false;

  protected __currentDirection: MOVE_DIRECTION = MOVE_DIRECTION.UP;

  get currentDirection(): MOVE_DIRECTION {
    return this.__currentDirection;
  }

  set currentDirection(tankMoveDirection: MOVE_DIRECTION) {
    this.__currentDirection = tankMoveDirection;
  }

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

  get getType() {
    return this.type;
  }

  abstract get sprite(): Sprite;

  setSpriteCode(code: number) {
    this.spriteCode = code;
  }

  setType(type: TankType) {
    this.type = type;
  }

  toggleIsNextFrame() {
    this.isNextFrame = !this.isNextFrame;
  }
}
