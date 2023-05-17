import { Tank } from './tank';

import { getNextPosition } from './getNextPosition';
import { Position } from './types';
import { TANK_MOVE_DIRECTION } from './game';

const MapRandomNumberToEnemyTankMoveDirection = new Map<
  number,
  TANK_MOVE_DIRECTION
>();

MapRandomNumberToEnemyTankMoveDirection.set(0, TANK_MOVE_DIRECTION.UP)
  .set(1, TANK_MOVE_DIRECTION.DOWN)
  .set(2, TANK_MOVE_DIRECTION.RIGHT)
  .set(3, TANK_MOVE_DIRECTION.LEFT);

const FIRST_BEHAVIOR_STAGE = 10;

const SECOND_BEHAVIOR_STAGE = 10;

function getRandomDirection() {
  const randomNumber = Math.floor(Math.random() * 4);

  return (
    MapRandomNumberToEnemyTankMoveDirection.get(randomNumber) ??
    TANK_MOVE_DIRECTION.DOWN
  );
}

export abstract class EnemyTank extends Tank {
  protected __currentDirection = TANK_MOVE_DIRECTION.DOWN;

  constructor(
    private respawnTimestamp: number,
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
    const randomValue = Math.floor(Math.random() * 256);
    console.log('randomValue: ', randomValue);
    console.log('position.x: ', this.position.x);
    console.log('position.y: ', this.position.y);

    if (randomValue % 16 === 0) {
      const newDirection = getRandomDirection();
      this.__currentDirection = newDirection;
    }

    if (canMove) {
      this.position = getNextPosition(this.position, this.currentDirection);
    }
  }
}
