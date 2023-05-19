import { Tank } from './tank';

import { getNextPosition } from './getNextPosition';
import { Position } from './types';
import { TANK_MOVE_DIRECTION } from './game';
import { getRandomValue } from '../../../utils/random';

const MapRandomNumberToEnemyTankMoveDirection = new Map<
  number,
  TANK_MOVE_DIRECTION
>();

MapRandomNumberToEnemyTankMoveDirection.set(0, TANK_MOVE_DIRECTION.UP)
  .set(1, TANK_MOVE_DIRECTION.DOWN)
  .set(2, TANK_MOVE_DIRECTION.RIGHT)
  .set(3, TANK_MOVE_DIRECTION.LEFT);

function isTimeToChangeDirectionForEnemyTank() {
  return getRandomValue() % 64 === 0;
}

function getRandomDirection() {
  const randomNumber = Math.floor(Math.random() * 4);

  return (
    MapRandomNumberToEnemyTankMoveDirection.get(randomNumber) ??
    TANK_MOVE_DIRECTION.DOWN
  );
}

export abstract class EnemyTank extends Tank {
  constructor(
    protected spawnPosition: Position,
    protected spriteLevel: number,
  ) {
    super();
    this.position = spawnPosition;
  }

  get currentDirection(): TANK_MOVE_DIRECTION {
    return this.__currentDirection;
  }

  update(canMove: boolean) {
    if (isTimeToChangeDirectionForEnemyTank()) {
      const newDirection = getRandomDirection();
      this.__currentDirection = newDirection;
    }

    if (canMove) {
      this.position = getNextPosition(this.position, this.currentDirection);
    }
  }
}
