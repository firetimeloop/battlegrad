import { TankType } from '@components/Game/utils/projectile';
import { PartialPosition, Position, Sprite } from './types';
import { MOVE_DIRECTION } from './game';

export abstract class Tank {
  protected type = TankType.enemy;

  protected x = 0;

  protected y = 0;

  protected spriteCode = 0;

  protected isNextFrame = false;

  protected __currentDirection: MOVE_DIRECTION = MOVE_DIRECTION.UP;

  get currentDirection(): MOVE_DIRECTION {
    return this.__currentDirection;
  }

  set currentDirection(tankMoveDirection: MOVE_DIRECTION) {
    this.__currentDirection = tankMoveDirection;
  }

  get getType(): TankType {
    return this.type;
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

  abstract get sprite(): Sprite;

  setSpriteCode(code: number) {
    this.spriteCode = code;
  }

  toggleIsNextFrame() {
    this.isNextFrame = !this.isNextFrame;
  }
}
