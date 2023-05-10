// Mock пуль, надо будет переделать на спрайтовые, когда взаимодействие с объектами будем делать
// сейчас так, чтобы хоть что-то рисовалось при нажатии на Пробел
import { Position, PartialPosition } from './types';

export class Projectile {
  private _radius = 2;

  private _color = '#fff';

  constructor(
        private x: number,
        private y: number,
        private velocity: {
            x: number;
            y: number;
        },
  ) {}

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

  get radius() {
    return this._radius;
  }

  get color() {
    return this._color;
  }
}
