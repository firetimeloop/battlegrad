import { PartialPosition, Position, Sprite } from './types';
import { TANK_MOVE_DIRECTION } from './game';

export abstract class Tank {
  protected x = 0;

  protected y = 0;

  protected spriteCode = 0;

  protected isNextFrame = false;

  protected __currentDirection: TANK_MOVE_DIRECTION = TANK_MOVE_DIRECTION.UP;

  get currentDirection(): TANK_MOVE_DIRECTION {
    return this.__currentDirection;
  }

  set currentDirection(tankMoveDirection: TANK_MOVE_DIRECTION) {
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

  abstract get sprite(): Sprite;

  setSpriteCode(code: number) {
    this.spriteCode = code;
  }

  toggleIsNextFrame() {
    this.isNextFrame = !this.isNextFrame;
  }
}
