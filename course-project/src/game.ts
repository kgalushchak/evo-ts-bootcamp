import {Direction} from './store';

type EyesPosition = Array<{x: number, y:number}>;

export const getEyesPosition = (direction: Direction, headPositionX: number, headPositionY: number, step: number): EyesPosition => {
  if (direction === Direction.LEFT) {
    return [{
      x: headPositionX,
      y: headPositionY + step / 4
    }, 
    {
      x: headPositionX,
      y: headPositionY + 3 * step / 4
    }];
  } else if (direction === Direction.RIGHT) {
    return [{
      x: headPositionX + step,
      y: headPositionY + step / 4
    },
    {
      x: headPositionX + step,
      y: headPositionY + 3 * step / 4
    }];
  } else if (direction === Direction.DOWN) {
    return [{
      x: headPositionX + step / 4,
      y: headPositionY + step
    },
    {
      x: headPositionX + 3 * step / 4,
      y: headPositionY + step
    }];
  } else {
    return [{
      x: headPositionX + step / 4,
      y: headPositionY
    },
    {
      x: headPositionX + 3 * step / 4,
      y: headPositionY
    }];
  }
};
