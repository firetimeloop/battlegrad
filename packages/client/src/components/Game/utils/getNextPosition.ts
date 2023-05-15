import { Position } from './types';
import { CONTROL_KEYS, MOVE_CONTROL_KEYS } from './game';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_SIZE,
} from './consts';

export const getNextPosition = (position: Position, activeKey: CONTROL_KEYS) => {
  const { x, y } = position;
  const nextPosition = {
    ...position,
  };

  switch (activeKey) {
    case MOVE_CONTROL_KEYS.DOWN: {
      if (y <= CANVAS_HEIGHT - CELL_SIZE) {
        nextPosition.y = y + 1;
      }
      break;
    }
    case MOVE_CONTROL_KEYS.UP: {
      nextPosition.y = y - 1;
      break;
    }
    case MOVE_CONTROL_KEYS.LEFT: {
      nextPosition.x = x - 1;
      break;
    }
    case MOVE_CONTROL_KEYS.RIGHT: {
      if (x <= CANVAS_WIDTH - CELL_SIZE) {
        nextPosition.x = x + 1;
      }
      break;
    }
    default: {
      break;
    }
  }

  return nextPosition;
};
