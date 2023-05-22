import { PlayerTank } from './playerTank';
import { Projectile } from './projectile';
import {
  MOVE_CONTROL_KEYS,
  SPECIAL_CONTROL_KEYS,
  CONTROL_KEYS,
  LastControlKey,
  TANK_MOVE_DIRECTION,
} from './game';
import {
  CELL_SIZE,
  LEVEL_OBJECT,
  LEVEL_OBJECT_COLLIDER_MAP,
  COLLIDER_BORDERS,
  SHOW_COLLIDERS,
  TANK_SIZE,
} from './consts';
import { Position, Collider } from './types';
import { LEVELS } from '../../../assets/levelsData';
import { getNextPosition } from './getNextPosition';
import { EnemyTank } from './enemyTank';
import { DefaultEnemyTank } from './defaultEnemyTank';
import { throttle } from '../../../utils/throttle';
import { Tank } from './tank';
import { getRandomValue } from '../../../utils/random';

export const isTimeToShotEnemyTank = () => getRandomValue() % 128 === 0;

// Для отрисовки коллайдеров
export const colliders: Collider[] = [];

export type Cell = {
  x: number;
  y: number;
  spriteType?: LEVEL_OBJECT;
  colliderBorders: [number, number, number, number] | null;
};

type CellWithoutSprite = Omit<Cell, 'spriteType' | 'colliderBorders'> & {
  colliderBorders: [number, number, number, number];
};

const PROJECTILE_VELOCITY = 5;

const getVelocity = (tankMoveDirection: TANK_MOVE_DIRECTION) => {
  if (tankMoveDirection === TANK_MOVE_DIRECTION.UP) {
    return {
      y: -PROJECTILE_VELOCITY,
      x: 0,
    };
  }
  if (tankMoveDirection === TANK_MOVE_DIRECTION.DOWN) {
    return {
      y: PROJECTILE_VELOCITY,
      x: 0,
    };
  }
  if (tankMoveDirection === TANK_MOVE_DIRECTION.LEFT) {
    return {
      x: -PROJECTILE_VELOCITY,
      y: 0,
    };
  }
  if (tankMoveDirection === TANK_MOVE_DIRECTION.RIGHT) {
    return {
      x: PROJECTILE_VELOCITY,
      y: 0,
    };
  }
};

const getColliderBorderOnLevel = ({
  x,
  y,
  colliderBorders,
}: CellWithoutSprite) => [
  colliderBorders[0] + x,
  colliderBorders[1] + y,
  colliderBorders[2] + x,
  colliderBorders[3] + y,
];

/// Временное решение потом нужно будет для каждого уровня опреледить количество врагов
const ENEMIES_COUNT = 4;

const MOVE_CONTROL_KEYS_VALUES = Object.values<string>(MOVE_CONTROL_KEYS);

function isCellWithoutSprite(cell: Cell): cell is CellWithoutSprite {
  if (cell.colliderBorders) {
    return true;
  }
  return false;
}

const allConditionsIsTrue = (conditions: boolean[]) =>
  conditions.every((condition) => condition);

const isCollidingWithCorner = (
  cornerCollidingConditions: boolean[],
  otherCornerCollidingConditions: boolean[],
) => {
  const isCollidingWithCorner = allConditionsIsTrue(cornerCollidingConditions);
  const isCollidingWithOtherCorner = allConditionsIsTrue(
    otherCornerCollidingConditions,
  );
  return isCollidingWithCorner || isCollidingWithOtherCorner;
};

// Модель
export class Level {
  private enemies: EnemyTank[] = [];

  // Временное решение точки спавна противников должны быть у каждого уровня свои
  private spawnPoints: Position[] = [
    {
      x: 0,
      y: 0,
    },
  ];

  private player = new PlayerTank();

  private projectiles: Projectile[] = [];

  private level: Cell[][] = [];

  private colSize: number = LEVELS[0][0].length;

  private rowSize: number = LEVELS[0].length;

  get isEnemySpawnAvailable(): boolean {
    return this.enemies.length < ENEMIES_COUNT;
  }

  setLevel(levelGrid: LEVEL_OBJECT[][]) {
    this.level = levelGrid.map((row, y) =>
      row.map((cell, x) => ({
        x: x * CELL_SIZE,
        y: y * CELL_SIZE,
        spriteType: cell,
        colliderBorders: COLLIDER_BORDERS[LEVEL_OBJECT_COLLIDER_MAP[cell]],
      })),
    );
  }

  getLevel() {
    return this.level;
  }

  update(activeControlKeys: Set<CONTROL_KEYS>, lastControlKey: LastControlKey) {
    if (
      lastControlKey.lastKey &&
      MOVE_CONTROL_KEYS_VALUES.includes(lastControlKey.lastKey)
    ) {
      const isNotColiding = !this.isColliding(this.player);
      this.player.update(activeControlKeys, isNotColiding);
    }

    this.enemies.forEach((enemy) => {
      const isEnemyNotColiding = !this.isColliding(enemy);

      enemy.update(isEnemyNotColiding);

      if (isTimeToShotEnemyTank()) {
        this.enemyCannonShot(enemy);
      }
    });
    this.projectiles.forEach((projectile) => projectile.update());
    if (activeControlKeys.has(SPECIAL_CONTROL_KEYS.SPACE)) {
      this.cannonShot(this.player);

      activeControlKeys.delete(SPECIAL_CONTROL_KEYS.SPACE);
    }

    if (this.isEnemySpawnAvailable) {
      this.spawnEnemy();
    }
  }

  isColliding(tank: Tank) {
    const { position, currentDirection } = tank;

    const possibleCellColliders = this.getPossibleCollidingCells(
      position,
      currentDirection,
    )
      .filter(isCellWithoutSprite)
      .map((cell) => getColliderBorderOnLevel(cell));

    colliders.length = 0;
    let isColliding = false;

    const { x: nextX, y: nextY } = getNextPosition(position, currentDirection);
    for (const collider of possibleCellColliders) {
      const [colliderStartX, colliderStartY, colliderEndX, colliderEndY] =
        collider;

      // LessOrEqual - LOE
      // GreaterOrEqual - GOE
      const isLOENextXThanColliderEndX = nextX <= colliderEndX;
      const isGOENextXThanColliderStartX = nextX >= colliderStartX;
      const isGOENextYThanColliderStartY = nextY >= colliderStartY;
      const isLOENextYThanColliderEndY = nextY <= colliderEndY;
      const isGOENextYTankSizeThanColliderStartY =
        nextY + TANK_SIZE >= colliderStartY;
      const isLOENextYTankSizeThanColliderEndY =
        nextY + TANK_SIZE <= colliderEndY;
      const isGOENextXTankSizeThanColliderStartX =
        nextX + TANK_SIZE >= colliderStartX;
      const isLOENextXTankSizeThanColliderEndX =
        nextX + TANK_SIZE <= colliderEndX;

      switch (currentDirection) {
        case TANK_MOVE_DIRECTION.LEFT: {
          isColliding = isCollidingWithCorner(
            [
              isLOENextXThanColliderEndX,
              isGOENextYThanColliderStartY,
              isLOENextYThanColliderEndY,
            ],
            [
              isLOENextXThanColliderEndX,
              isGOENextYTankSizeThanColliderStartY,
              isLOENextYTankSizeThanColliderEndY,
            ],
          );
          break;
        }
        case TANK_MOVE_DIRECTION.RIGHT: {
          isColliding = isCollidingWithCorner(
            [
              isGOENextXTankSizeThanColliderStartX,
              isGOENextYThanColliderStartY,
              isLOENextYThanColliderEndY,
            ],
            [
              isGOENextXTankSizeThanColliderStartX,
              isGOENextYTankSizeThanColliderStartY,
              isLOENextYTankSizeThanColliderEndY,
            ],
          );
          break;
        }
        case TANK_MOVE_DIRECTION.DOWN: {
          isColliding = isCollidingWithCorner(
            [
              isGOENextYTankSizeThanColliderStartY,
              isGOENextXThanColliderStartX,
              isLOENextXThanColliderEndX,
            ],
            [
              isGOENextYTankSizeThanColliderStartY,
              isGOENextXTankSizeThanColliderStartX,
              isLOENextXTankSizeThanColliderEndX,
            ],
          );
          break;
        }
        case TANK_MOVE_DIRECTION.UP: {
          isColliding = isCollidingWithCorner(
            [
              isLOENextYThanColliderEndY,
              isGOENextXThanColliderStartX,
              isLOENextXThanColliderEndX,
            ],
            [
              isLOENextYThanColliderEndY,
              isGOENextXTankSizeThanColliderStartX,
              isLOENextXTankSizeThanColliderEndX,
            ],
          );
          break;
        }
        default:
          break;
      }
      if (isColliding && SHOW_COLLIDERS) {
        colliders.push([
          colliderStartX,
          colliderStartY,
          colliderEndX - colliderStartX,
          colliderEndY - colliderStartY,
        ]);
      }
      if (isColliding) {
        return true;
      }
    }
  }

  getPossibleCollidingCells(
    position: Position,
    tankMoveDirection: TANK_MOVE_DIRECTION,
  ) {
    const result = [];
    const col = Math.floor(position.x / CELL_SIZE);
    const row = Math.floor(position.y / CELL_SIZE);

    if (tankMoveDirection === TANK_MOVE_DIRECTION.UP && row !== 0) {
      result.push(this.level[row - 1][col]);
      // Из-за верхних стен
      result.push(this.level[row][col]);

      // Проверяем нужны ли ячейки справа от текущей
      if (col !== this.colSize - 1 && position.x % CELL_SIZE !== 0) {
        result.push(this.level[row - 1][col + 1]);
        // Из-за верхних стен
        result.push(this.level[row][col + 1]);
      }
    } else if (
      tankMoveDirection === TANK_MOVE_DIRECTION.DOWN &&
      row !== this.rowSize - 1
    ) {
      result.push(this.level[row + 1][col]);

      // Проверяем нужны ли ячейки справа от текущей
      if (col !== this.colSize - 1 && position.x % CELL_SIZE !== 0) {
        result.push(this.level[row + 1][col + 1]);
      }
    } else if (tankMoveDirection === TANK_MOVE_DIRECTION.LEFT && col !== 0) {
      result.push(this.level[row][col - 1]);
      // Из-за левых стен
      result.push(this.level[row][col]);

      // Проверяем нужны ли ячейки слева от текущей
      if (row !== this.rowSize - 1 && position.y % CELL_SIZE !== 0) {
        result.push(this.level[row + 1][col - 1]);
      }
    } else if (
      tankMoveDirection === TANK_MOVE_DIRECTION.RIGHT &&
      col !== this.colSize - 1
    ) {
      result.push(this.level[row][col + 1]);

      // Проверяем нужны ли ячейки справа от текущей
      if (row !== this.rowSize - 1 && position.y % CELL_SIZE !== 0) {
        result.push(this.level[row + 1][col + 1]);
      }
    }

    return result;
  }

  spawnEnemy = throttle(
    () => {
      const spawnPosition = this.spawnPoints[0];

      this.enemies.push(new DefaultEnemyTank(spawnPosition));
    },
    5000,
    this,
  );

  cannonShot(tank: Tank) {
    const { x, y } = tank.position;
    const velocity = getVelocity(tank.currentDirection);

    if (velocity) {
      this.projectiles.push(
        new Projectile(x + TANK_SIZE / 2, y + TANK_SIZE / 2, velocity),
      );
    }
  }

  enemyCannonShot = throttle(this.cannonShot, 5000, this);

  getPlayer() {
    return this.player;
  }

  getEnemies() {
    return this.enemies;
  }

  getProjectiles() {
    return this.projectiles;
  }
}
