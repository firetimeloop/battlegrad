import { MOVE_DIRECTION } from '@components/Game/utils/game';
import { PartialPosition, Position, Sprite } from './types';

const ProjectileSprite: Record<MOVE_DIRECTION, Sprite> = {
  [MOVE_DIRECTION.UP]: [323, 102, 3, 4],
  [MOVE_DIRECTION.RIGHT]: [346, 102, 4, 3],
  [MOVE_DIRECTION.DOWN]: [339, 102, 3, 4],
  [MOVE_DIRECTION.LEFT]: [330, 102, 4, 3],
};

export enum TankType {
  player = 'player',
  enemy = 'enemy',
}

export class Projectile {
  constructor(
        private x: number,
        private y: number,
        private initiator: TankType,
        private direction: MOVE_DIRECTION,
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

  get type(): TankType {
    return this.initiator;
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
