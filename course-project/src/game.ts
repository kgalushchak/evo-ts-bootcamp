import {Direction} from './SnakeGame';

const LEFT_EYE_INDENT = 0.25;
const RIGHT_EYE_INDENT = 0.75;

type EyesPosition = Array<{x: number, y:number}>;

export const getEyesPosition = (
  direction: Direction,
  headPositionX: number,
  headPositionY: number,
  step: number
): EyesPosition => {
  if (direction === Direction.LEFT) {
    return [{
      x: headPositionX,
      y: headPositionY + step * LEFT_EYE_INDENT
    }, 
    {
      x: headPositionX,
      y: headPositionY + step * RIGHT_EYE_INDENT
    }];
  } else if (direction === Direction.RIGHT) {
    return [{
      x: headPositionX + step,
      y: headPositionY + step * LEFT_EYE_INDENT
    },
    {
      x: headPositionX + step,
      y: headPositionY + step * RIGHT_EYE_INDENT
    }];
  } else if (direction === Direction.DOWN) {
    return [{
      x: headPositionX + step * LEFT_EYE_INDENT,
      y: headPositionY + step
    },
    {
      x: headPositionX + step * RIGHT_EYE_INDENT,
      y: headPositionY + step
    }];
  } else {
    return [{
      x: headPositionX + step * LEFT_EYE_INDENT,
      y: headPositionY
    },
    {
      x: headPositionX + step * RIGHT_EYE_INDENT,
      y: headPositionY
    }];
  }
};

const generateRandomNumberUsingStep = (maxNumber: number, step: number) => {
  const a =  Math.floor(Math.random() * (maxNumber / step)) * step;
  console.log(a);
  return a;
};

export const getFoodPosition = (height: number, width: number, step: number): {x: number, y:number} => {
  return {
    x: generateRandomNumberUsingStep(width, step),
    y: generateRandomNumberUsingStep(height, step)
  };
};
