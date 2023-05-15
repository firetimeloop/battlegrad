import { Sprite } from './sprite';
import type { Level } from './level';
import type { Tank } from './tank';
import { Cell, colliders } from './level';
import {
  SPRITE_MAP,
  CELL_SIZE,
  SHOW_COLLIDERS,
  TANK_SIZE,
} from './consts';
import { Projectile } from './projectile';

type InitControlFunction = (code: string) => void;

// Представление уровня
export class LevelView {
  constructor(
        private context: CanvasRenderingContext2D,
        private sprite: Sprite,
  ) {}

  async init(initKeyDownControls: InitControlFunction, initKeyUpControls: InitControlFunction) {
    document.addEventListener('keydown', (event) => {
      const { code } = event;
      initKeyDownControls(code);
    });

    document.addEventListener('keyup', (event) => {
      const { code } = event;

      initKeyUpControls(code);
    });
    await this.sprite.load();
  }

  update(level: Level) {
    const player = level.getPlayer();
    const currentLevel = level.getLevel();
    const projectiles = level.getProjectiles();
    this.renderLevel(currentLevel);
    this.renderPlayer(player);
    this.renderProjectiles(projectiles);
  }

  renderPlayer(player: Tank) {
    const spriteImage = this.sprite.getImage();
    const playerPosition = player.position;
    this.context.drawImage(
      spriteImage,
      ...player.sprite,
      playerPosition.x,
      playerPosition.y,
      TANK_SIZE,
      TANK_SIZE,
    );

    if (SHOW_COLLIDERS) {
      this.context.strokeStyle = 'white';
      this.context.strokeRect(
        playerPosition.x,
        playerPosition.y,
        TANK_SIZE,
        TANK_SIZE,
      );
    }
  }

  renderLevel(currentLevel: Cell[][]) {
    const spriteImage = this.sprite.getImage();

    for (let i = 0; i < currentLevel.length; i += 1) {
      for (let j = 0; j < currentLevel[i].length; j += 1) {
        const { x, y, spriteType } = currentLevel[i][j];
        const sprite = SPRITE_MAP[spriteType];

        this.context.drawImage(
          spriteImage,
          ...sprite,
          x,
          y,
          CELL_SIZE,
          CELL_SIZE,
        );
      }
    }

    // Отрисовка коллайдеров
    if (SHOW_COLLIDERS && colliders) {
      for (const [colliderStartX, colliderStartY, width, height] of colliders) {
        this.context.strokeStyle = 'white';
        this.context.strokeRect(colliderStartX, colliderStartY, width, height);
      }
    }
  }

  renderProjectiles(projectiles: Projectile[]) {
    projectiles.forEach((projectile) => {
      const { x, y } = projectile.position;
      const { radius } = projectile;
      const { color } = projectile;
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, Math.PI * 2);
      this.context.fillStyle = color;
      this.context.fill();
    });
  }
}
