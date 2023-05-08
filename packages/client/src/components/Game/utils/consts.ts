import { Sprite } from './types';

export const CANVAS_WIDTH = 208;
export const CANVAS_HEIGHT = 208;

export const CELL_SIZE = 16;

export enum LEVEL_OBJECT {
    EMPTY = 0,
    WALL = 1,
    BOTTOM_WALL = 2,
    LEFT_WALL = 3,
    RIGHT_WALL = 4,
    TOP_WALL = 5,
    TOP_METAL_WALL = 6,
    STANDARD = 7,
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

export const SPRITE_MAP: Record<LEVEL_OBJECT, Sprite> = (
    Object.keys(LEVEL_OBJECT_SPRITE_CODE) as unknown as LEVEL_OBJECT[]
).reduce((acc, current: LEVEL_OBJECT) => {
  const [cellStart, cellRow] = LEVEL_OBJECT_SPRITE_CODE[current];
  acc[current] = [cellStart * CELL_SIZE, cellRow * CELL_SIZE, CELL_SIZE, CELL_SIZE];
  return acc;
}, {} as Record<LEVEL_OBJECT, Sprite>);
