import { PartialPosition, Position, Sprite } from './types';

export enum Direction {
  up = 'up',
  right = 'right',
  down = 'down',
  left = 'left',
}

export class Projectile {
  constructor(
        private x: number,
        private y: number,
        private direction: Direction,
        private velocity: {
            x: number;
            y: number;
        },
  ) {}

  get sprite(): Sprite {
    switch (this.direction) {
      case Direction.up: {
        return [323, 102, 3, 4];
      }
      case Direction.right: {
        return [346, 102, 4, 3];
      }
      case Direction.down: {
        return [339, 102, 3, 4];
      }
      case Direction.left: default: {
        return [330, 102, 4, 3];
      }
    }
  }

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

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
