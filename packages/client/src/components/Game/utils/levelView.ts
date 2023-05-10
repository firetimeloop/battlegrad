import { Sprite } from './sprite';
import type { Level } from './level';
import type { Tank } from './tank';
import { Cell } from './level';
import { SPRITE_MAP, CELL_SIZE } from './consts';
import { Projectile } from './projectile';

// Представление уровня
export class LevelView {
  constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        private sprite: Sprite,
  ) {}

  async init() {
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
      CELL_SIZE,
      CELL_SIZE,
    );
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
