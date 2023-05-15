import { Sprite } from './types';

export const CANVAS_WIDTH = 208;
export const CANVAS_HEIGHT = 208;

export const CELL_SIZE = 16;
// Чтобы танк мог пройти между коллайдерами;
export const TANK_SIZE = CELL_SIZE - 2;

// Включаем и отключаем показ коллайдеров
export const SHOW_COLLIDERS = true;

export enum LEVEL_OBJECT {
    EMPTY,
    WALL,
    BOTTOM_WALL,
    LEFT_WALL,
    RIGHT_WALL,
    TOP_WALL,
    TOP_METAL_WALL,
    STANDARD,
}

const {
  EMPTY,
  WALL,
  LEFT_WALL,
  RIGHT_WALL,
  TOP_WALL,
  BOTTOM_WALL,
  TOP_METAL_WALL,
  STANDARD,
} = LEVEL_OBJECT;

export const LEVEL_OBJECT_SPRITE_CODE = {
  [EMPTY]: [21, 0],
  [WALL]: [16, 0],
  [LEFT_WALL]: [19, 0],
  [RIGHT_WALL]: [17, 0],
  [TOP_WALL]: [20, 0],
  [BOTTOM_WALL]: [18, 0],
  [TOP_METAL_WALL]: [20, 1],
  [STANDARD]: [19, 2],
};

export enum COLLIDER {
  NONE,
  WHOLE,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}

const {
  NONE,
  WHOLE,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
} = COLLIDER;

export const COLLIDER_BORDERS: Record<COLLIDER, [number, number, number, number] | null> = {
  [NONE]: null,
  [WHOLE]: [0, 0, CELL_SIZE, CELL_SIZE],
  [LEFT]: [0, 0, CELL_SIZE / 2, CELL_SIZE],
  [RIGHT]: [CELL_SIZE / 2, 0, CELL_SIZE, CELL_SIZE],
  [TOP]: [0, 0, CELL_SIZE, CELL_SIZE / 2],
  [BOTTOM]: [0, CELL_SIZE / 2, CELL_SIZE, CELL_SIZE],
};

export const LEVEL_OBJECT_COLLIDER_MAP = {
  [EMPTY]: NONE,
  [WALL]: WHOLE,
  [LEFT_WALL]: LEFT,
  [RIGHT_WALL]: RIGHT,
  [TOP_WALL]: TOP,
  [BOTTOM_WALL]: BOTTOM,
  [TOP_METAL_WALL]: TOP,
  [STANDARD]: WHOLE,
};

export const SPRITE_MAP: Record<LEVEL_OBJECT, Sprite> = (
    Object.keys(LEVEL_OBJECT_SPRITE_CODE) as unknown as LEVEL_OBJECT[]
).reduce((acc, current: LEVEL_OBJECT) => {
  const [cellStart, cellRow] = LEVEL_OBJECT_SPRITE_CODE[current];
  acc[current] = [cellStart * CELL_SIZE, cellRow * CELL_SIZE, CELL_SIZE, CELL_SIZE];
  return acc;
}, {} as Record<LEVEL_OBJECT, Sprite>);
