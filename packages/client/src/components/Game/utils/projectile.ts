import { PartialPosition, Position, Sprite } from './types';

export enum Direction {
  up = 'up',
  right = 'right',
  down = 'down',
  left = 'left',
}

const ProjectileSprite: Record<string, Sprite> = {
  [Direction.up]: [323, 102, 3, 4],
  [Direction.right]: [346, 102, 4, 3],
  [Direction.down]: [339, 102, 3, 4],
  [Direction.left]: [330, 102, 4, 3],
};

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
    return ProjectileSprite[this.direction];
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
