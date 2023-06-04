import { Tank } from './tank';

import { getNextPosition } from './getNextPosition';
import { Position } from './types';
import { MOVE_DIRECTION } from './game';
import { getRandomValue } from '../../../utils/random';

const MapRandomNumberToEnemyTankMoveDirection = new Map<
  number,
  MOVE_DIRECTION
>();

MapRandomNumberToEnemyTankMoveDirection.set(0, MOVE_DIRECTION.UP)
  .set(1, MOVE_DIRECTION.DOWN)
  .set(2, MOVE_DIRECTION.RIGHT)
  .set(3, MOVE_DIRECTION.LEFT);

function isTimeToChangeDirectionForEnemyTank() {
  return getRandomValue() % 64 === 0;
}

function getRandomDirection() {
  const randomNumber = Math.floor(Math.random() * 4);

  return (
    MapRandomNumberToEnemyTankMoveDirection.get(randomNumber) ??
    MOVE_DIRECTION.DOWN
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

  get currentDirection(): MOVE_DIRECTION {
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
