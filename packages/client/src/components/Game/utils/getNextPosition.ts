import { Position } from './types';
import { MOVE_DIRECTION } from './game';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from './consts';

export const getNextPosition = (
  position: Position,
  tankMoveDirection: MOVE_DIRECTION,
) => {
  const { x, y } = position;
  const nextPosition = {
    ...position,
  };

  switch (tankMoveDirection) {
    case MOVE_DIRECTION.DOWN: {
      if (y <= CANVAS_HEIGHT - CELL_SIZE) {
        nextPosition.y = y + 1;
      }
      break;
    }
    case MOVE_DIRECTION.UP: {
      nextPosition.y = y - 1;
      break;
    }
    case MOVE_DIRECTION.LEFT: {
      nextPosition.x = x - 1;
      break;
    }
    case MOVE_DIRECTION.RIGHT: {
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
