import { Position, Sprite } from './types';

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
      return [259, 130, 10, 10];
    }
    if (this.counter > 10) {
      return [273, 129, 13, 13];
    }
    return [288, 128, 16, 16];
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
