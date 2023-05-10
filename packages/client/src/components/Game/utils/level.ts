import { Tank } from './tank';
import { Projectile } from './projectile';
import {
  MOVE_CONTROL_KEYS, SPECIAL_CONTROL_KEYS, CONTROL_KEYS, LastControlKey,
} from './game';
import { CELL_SIZE, LEVEL_OBJECT } from './consts';

export type Cell = {
    x: number;
    y: number;
    spriteType: LEVEL_OBJECT
}

// Mock
const getVelocity = (lastControlKey: LastControlKey) => {
  const { lastKey } = lastControlKey;

  if (lastKey === MOVE_CONTROL_KEYS.UP) {
    return {
      y: -5,
      x: 0,
    };
  } if (lastKey === MOVE_CONTROL_KEYS.DOWN) {
    return {
      y: 5,
      x: 0,
    };
  } if (lastKey === MOVE_CONTROL_KEYS.LEFT) {
    return {
      x: -5,
      y: 0,
    };
  } if (lastKey === MOVE_CONTROL_KEYS.RIGHT) {
    return {
      x: 5,
      y: 0,
    };
  }
};

// Модель
export class Level {
  private player = new Tank();

  private projectiles: Projectile[] = [];

  private level: Cell[][] = [];

  setLevel(levelGrid: LEVEL_OBJECT[][]) {
    this.level = levelGrid.map((row, y) => row.map((cell, x) => ({
      x: x * CELL_SIZE,
      y: y * CELL_SIZE,
      spriteType: cell,
    })));
  }

  getLevel() {
    return this.level;
  }

  update(activeControlKeys: Set<CONTROL_KEYS>, lastControlKey: LastControlKey) {
    this.player.update(activeControlKeys);
    this.projectiles.forEach((projectile) => projectile.update());
    if (activeControlKeys.has(SPECIAL_CONTROL_KEYS.SPACE)) {
      const { x, y } = this.player.position;
      const velocity = getVelocity(lastControlKey);

      if (velocity) {
        this.projectiles.push(new Projectile(x + CELL_SIZE / 2, y + CELL_SIZE / 2, velocity));
      }

      activeControlKeys.delete(SPECIAL_CONTROL_KEYS.SPACE);
    }
  }

  getPlayer() {
    return this.player;
  }

  getProjectiles() {
    return this.projectiles;
  }
}
