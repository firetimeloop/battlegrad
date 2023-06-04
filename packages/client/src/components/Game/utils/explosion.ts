import { Position, Sprite } from './types';

const ExplosionSpriteStart: Sprite = [259, 130, 10, 10];
const ExplosionSpriteMiddle: Sprite = [273, 129, 13, 13];
const ExplosionSpriteEnd: Sprite = [288, 128, 16, 16];

export class Explosion {
  public counter = 0;

  constructor(
        private x: number,
        private y: number,
        private initCounter: number,
  ) {
    this.counter = initCounter;
  }

  get sprite(): Sprite {
    if (this.counter > 20) {
      return ExplosionSpriteStart;
    }
    if (this.counter > 10) {
      return ExplosionSpriteMiddle;
    }
    return ExplosionSpriteEnd;
  }

  get position(): Position {
    return {
      x: this.x,
      y: this.y,
    };
  }

  update() {
    this.counter -= 1;
  }
}
