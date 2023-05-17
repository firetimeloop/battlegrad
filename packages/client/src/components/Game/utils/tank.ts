import { PartialPosition, Position, Sprite } from './types';

export abstract class Tank {
  protected x = 0;

  protected y = 0;

  protected spriteCode = 0;

  protected isNextFrame = false;

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
