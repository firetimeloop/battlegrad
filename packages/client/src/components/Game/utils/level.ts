import { Explosion } from '@components/Game/utils/explosion';
import { Tank } from './tank';
import { Direction, Projectile } from './projectile';
import { CONTROL_KEYS, LastControlKey, MOVE_CONTROL_KEYS, SPECIAL_CONTROL_KEYS } from './game';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_SIZE,
  COLLIDER_BORDERS,
  LEVEL_OBJECT,
  LEVEL_OBJECT_COLLIDER_MAP,
  SHOW_COLLIDERS,
  TANK_SIZE,
} from './consts';
import { Collider, Position } from './types';
import { LEVELS } from '../../../assets/levelsData';
import { getNextPosition } from './getNextPosition';

// Для отрисовки коллайдеров
export const colliders: Collider[] = [];

export type Cell = {
  x: number;
  y: number;
  spriteType?: LEVEL_OBJECT;
  colliderBorders: [number, number, number, number] | null;
}

type CellWithoutSprite = Omit<Cell, 'spriteType' | 'colliderBorders'> & {
  colliderBorders: [number, number, number, number];
};

const PROJECTILE_VELOCITY = 3;

const getVelocity = (lastControlKey: LastControlKey) => {
  const { lastKey } = lastControlKey;

  if (lastKey === MOVE_CONTROL_KEYS.UP) {
    return {
      y: -PROJECTILE_VELOCITY,
      x: 0,
    };
  }
  if (lastKey === MOVE_CONTROL_KEYS.DOWN) {
    return {
      y: PROJECTILE_VELOCITY,
      x: 0,
    };
  }
  if (lastKey === MOVE_CONTROL_KEYS.LEFT) {
    return {
      x: -PROJECTILE_VELOCITY,
      y: 0,
    };
  }
  if (lastKey === MOVE_CONTROL_KEYS.RIGHT) {
    return {
      x: PROJECTILE_VELOCITY,
      y: 0,
    };
  }
};

const getDirection = (lastControlKey: LastControlKey) => {
  const { lastKey } = lastControlKey;

  if (lastKey === MOVE_CONTROL_KEYS.UP) {
    return Direction.up;
  }
  if (lastKey === MOVE_CONTROL_KEYS.DOWN) {
    return Direction.down;
  }
  if (lastKey === MOVE_CONTROL_KEYS.LEFT) {
    return Direction.left;
  }
  if (lastKey === MOVE_CONTROL_KEYS.RIGHT) {
    return Direction.right;
  }
};

const getColliderBorderOnLevel = (
  { x, y, colliderBorders }: CellWithoutSprite,
) => [
  colliderBorders[0] + x,
  colliderBorders[1] + y,
  colliderBorders[2] + x,
  colliderBorders[3] + y,
];

const MOVE_CONTROL_KEYS_VALUES = Object.values<string>(MOVE_CONTROL_KEYS);

function isCellWithoutSprite(cell: Cell): cell is CellWithoutSprite {
  if (cell.colliderBorders) {
    return true;
  }
  return false;
}

const allConditionsIsTrue = (conditions: boolean[]) => (
  conditions.every((condition) => condition)
);

const isCollidingWithCorner = (
  cornerCollidingConditions: boolean[],
  otherCornerCollidingConditions: boolean[],
) => {
  const isCollidingWithCorner = allConditionsIsTrue(cornerCollidingConditions);
  const isCollidingWithOtherCorner = allConditionsIsTrue(otherCornerCollidingConditions);
  return isCollidingWithCorner || isCollidingWithOtherCorner;
};

const isCellBreakable = (celltype: LEVEL_OBJECT) => [
  LEVEL_OBJECT.WALL,
  LEVEL_OBJECT.BOTTOM_WALL,
  LEVEL_OBJECT.LEFT_WALL,
  LEVEL_OBJECT.RIGHT_WALL,
  LEVEL_OBJECT.TOP_WALL,
].includes(celltype);

// Модель
export class Level {
  private player = new Tank();

  private projectiles: Projectile[] = [];

  private explosions: Explosion[] = [];

  private level: Cell[][] = [];

  private colSize: number = LEVELS[0][0].length;

  private rowSize: number = LEVELS[0].length;

  setLevel(levelGrid: LEVEL_OBJECT[][]) {
    this.level = levelGrid.map((row, y) => row.map((cell, x) => ({
      x: x * CELL_SIZE,
      y: y * CELL_SIZE,
      spriteType: cell,
      colliderBorders: COLLIDER_BORDERS[LEVEL_OBJECT_COLLIDER_MAP[cell]],
    })));
  }

  getLevel() {
    return this.level;
  }

  update(activeControlKeys: Set<CONTROL_KEYS>, lastControlKey: LastControlKey) {
    const isNotColiding = !this.isColliding(this.player, lastControlKey);
    this.player.update(activeControlKeys, isNotColiding);
    this.projectiles.forEach((projectile) => projectile.update());
    this.explosions.forEach((explosion) => explosion.update());
    if (activeControlKeys.has(SPECIAL_CONTROL_KEYS.SPACE)) {
      if (this.player.canShoot) {
        this.player.shoot();
        const { x, y } = this.player.position;
        const velocity = getVelocity(lastControlKey);
        const direction = getDirection(lastControlKey);

        if (velocity && direction) {
          const offsetX = () => {
            if (direction === Direction.right) {
              return TANK_SIZE;
            }
            if (direction === Direction.left) {
              return -4;
            }
            return TANK_SIZE / 2 - 2;
          };
          const offsetY = () => {
            if (direction === Direction.down) {
              return TANK_SIZE;
            }
            if (direction === Direction.up) {
              return -4;
            }
            return TANK_SIZE / 2 - 1;
          };

          this.projectiles.push(new Projectile(
            x + offsetX(),
            y + offsetY(),
            direction,
            velocity,
          ));
        }
      }

      activeControlKeys.delete(SPECIAL_CONTROL_KEYS.SPACE);
    }
  }

  isColliding(tank: Tank, lastControlKey: LastControlKey) {
    const { lastKey } = lastControlKey;
    if (!lastKey) {
      return false;
    }

    const { position } = tank;

    const possibleCellColliders = this.getPossibleCollidingCells(
      position,
      lastControlKey,
    )
      .filter(isCellWithoutSprite)
      .map((cell) => getColliderBorderOnLevel(cell));

    colliders.length = 0;
    let isColliding = false;

    const { x: nextX, y: nextY } = getNextPosition(position, lastKey);
    if (MOVE_CONTROL_KEYS_VALUES.includes(lastKey)) {
      for (const collider of possibleCellColliders) {
        const [colliderStartX, colliderStartY, colliderEndX, colliderEndY] = collider;

        // LessOrEqual - LOE
        // GreaterOrEqual - GOE
        const isLOENextXThanColliderEndX = nextX <= colliderEndX;
        const isGOENextXThanColliderStartX = nextX >= colliderStartX;
        const isGOENextYThanColliderStartY = nextY >= colliderStartY;
        const isLOENextYThanColliderEndY = nextY <= colliderEndY;
        const isGOENextYTankSizeThanColliderStartY = (nextY + TANK_SIZE) >= colliderStartY;
        const isLOENextYTankSizeThanColliderEndY = (nextY + TANK_SIZE) <= colliderEndY;
        const isGOENextXTankSizeThanColliderStartX = (nextX + TANK_SIZE) >= colliderStartX;
        const isLOENextXTankSizeThanColliderEndX = (nextX + TANK_SIZE) <= colliderEndX;

        switch (lastKey) {
          case MOVE_CONTROL_KEYS.LEFT: {
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
          case MOVE_CONTROL_KEYS.RIGHT: {
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
          case MOVE_CONTROL_KEYS.DOWN: {
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
          case MOVE_CONTROL_KEYS.UP: {
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

    return false;
  }

  getPossibleCollidingCells(position: Position, lastControlKey: LastControlKey) {
    const result = [];
    const col = Math.floor(position.x / CELL_SIZE);
    const row = Math.floor(position.y / CELL_SIZE);

    const controlKey = lastControlKey.lastKey;

    if (controlKey === MOVE_CONTROL_KEYS.UP && row !== 0) {
      result.push(this.level[row - 1][col]);
      // Из-за верхних стен
      result.push(this.level[row][col]);

      // Проверяем нужны ли ячейки справа от текущей
      if (col !== this.colSize - 1 && (position.x % CELL_SIZE !== 0)) {
        result.push(this.level[row - 1][col + 1]);
        // Из-за верхних стен
        result.push(this.level[row][col + 1]);
      }
    } else if (controlKey === MOVE_CONTROL_KEYS.DOWN && row !== this.rowSize - 1) {
      result.push(this.level[row + 1][col]);

      // Проверяем нужны ли ячейки справа от текущей
      if (col !== this.colSize - 1 && (position.x % CELL_SIZE !== 0)) {
        result.push(this.level[row + 1][col + 1]);
      }
    } else if (controlKey === MOVE_CONTROL_KEYS.LEFT && col !== 0) {
      result.push(this.level[row][col - 1]);
      // Из-за левых стен
      result.push(this.level[row][col]);

      // Проверяем нужны ли ячейки слева от текущей
      if (row !== this.rowSize - 1 && (position.y % CELL_SIZE !== 0)) {
        result.push(this.level[row + 1][col - 1]);
      }
    } else if (controlKey === MOVE_CONTROL_KEYS.RIGHT && col !== this.colSize - 1) {
      result.push(this.level[row][col + 1]);

      // Проверяем нужны ли ячейки справа от текущей
      if (row !== this.rowSize - 1 && (position.y % CELL_SIZE !== 0)) {
        result.push(this.level[row + 1][col + 1]);
      }
    }

    return result;
  }

  getPlayer() {
    return this.player;
  }

  getExplosions() {
    this.explosions = this.explosions.filter((i) => i.counter > 0);
    return this.explosions;
  }

  getProjectiles() {
    const collidableTiles = this.level.flat().filter((i) => i.spriteType !== LEVEL_OBJECT.EMPTY);

    this.projectiles = this.projectiles.filter((projectile) => {
      const { x, y } = projectile.position;
      const outOfBoundsX = x > CANVAS_WIDTH || x < 0;
      const outOfBoundsY = y > CANVAS_HEIGHT || y < 0;

      const collideCell = collidableTiles.find((cell) => {
        if (!cell.colliderBorders || !cell.spriteType) {
          return false;
        }
        const [colliderXStart, colliderYStart, colliderXEnd, colliderYEnd] = cell.colliderBorders;

        const cellXStart = cell.x + colliderXStart;
        const cellXEnd = cellXStart + colliderXEnd;
        const cellYStart = cell.y + colliderYStart;
        const cellYEnd = cellYStart + colliderYEnd;

        const includeX = cellXStart < (x + 2) && cellXEnd > (x - 2);
        const includeY = cellYStart < (y + 2) && cellYEnd > (y - 2);

        return includeX && includeY;
      });

      if (collideCell && collideCell.spriteType) {
        if (isCellBreakable(collideCell.spriteType)) {
          collideCell.spriteType = LEVEL_OBJECT.EMPTY;
          collideCell.colliderBorders = null;
          this.explosions.push(new Explosion(x, y, 30));
        }

        return false;
      }

      return !outOfBoundsX && !outOfBoundsY;
    });

    return this.projectiles;
  }
}
