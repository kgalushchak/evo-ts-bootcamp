import {Direction, EyesPosition, Snake} from './types';

const LEFT_EYE_INDENT = 0.25;
const RIGHT_EYE_INDENT = 0.75;

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
  const a =  Math.floor(Math.random() * (maxNumber / step)) * step; //TODO adjust so food is not displayed on the edge
  return a;
};

export const getFoodPosition = (height: number, width: number, step: number): {x: number, y:number} => {
  return {
    x: generateRandomNumberUsingStep(width, step),
    y: generateRandomNumberUsingStep(height, step)
  };
};

export const moveSnake = (snake: Snake, direction: Direction, step: number): Snake => {
  const newSnake = [...snake];
  const elemToRemove = newSnake.pop()!; // TODO perhaps it will be useful later
  if (direction === Direction.RIGHT) {
    newSnake.unshift({x: snake[0].x + step, y: snake[0].y});
  } else if (direction === Direction.LEFT) {
    newSnake.unshift({x: snake[0].x - step, y: snake[0].y});
  } else if (direction === Direction.UP) {
    newSnake.unshift({x: snake[0].x, y: snake[0].y - step});
  } else {
    newSnake.unshift({x: snake[0].x, y: snake[0].y + step});
  }
  return newSnake;
};
