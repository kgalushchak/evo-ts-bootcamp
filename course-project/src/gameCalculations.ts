import {Direction, EyesPosition, FoodType, Position, Snake} from './types';
import {food} from './food';

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

export const moveSnake = (snake: Snake, direction: Direction, step: number, width: number, height: number): Snake => {
  const newSnake = [...snake];
  newSnake.pop()!;
  switch (direction) {
  case Direction.RIGHT:
    if (snake[0].x >= width - step) {
      newSnake.unshift({x: 0, y: snake[0].y});
    } else {
      newSnake.unshift({x: snake[0].x + step, y: snake[0].y});
    }
    return newSnake;
  case Direction.LEFT:
    if (snake[0].x <= 0) {
      newSnake.unshift({x: width - step, y: snake[0].y});
    } else {
      newSnake.unshift({x: snake[0].x - step, y: snake[0].y});
    }
    return newSnake;

  case Direction.UP:
    if (snake[0].y <= 0) {
      newSnake.unshift({x: snake[0].x, y: height - step});
    } else {
      newSnake.unshift({x: snake[0].x, y: snake[0].y - step});
    }
    return newSnake;

  case Direction.DOWN:
    if (snake[0].y >= height - step) {
      newSnake.unshift({x: snake[0].x, y: 0});
    } else {
      newSnake.unshift({x: snake[0].x, y: snake[0].y + step});
    }
    return newSnake;
  default: return newSnake;
  }
};

export const isFoodEaten = (snake: Snake, foodPosition: Position): boolean => {
  if (snake[0].x === foodPosition.x && snake[0].y === foodPosition.y) {
    return true;
  } else return false;
};

export const adjustSnakeLength = (snake: Snake, direction: Direction, step: number): Snake => {
  const newSnake = [...snake];
  switch (direction) {
  case Direction.RIGHT:
    newSnake.unshift({x: snake[0].x + step, y: snake[0].y});
    return newSnake;
  case Direction.LEFT:
    newSnake.unshift({x: snake[0].x - step, y: snake[0].y});
    return newSnake;
  case Direction.UP:
    newSnake.unshift({x: snake[0].x, y: snake[0].y - step});
    return newSnake;
  case Direction.DOWN:
    newSnake.unshift({x: snake[0].x, y: snake[0].y + step});
    return newSnake;
  default: return newSnake;
  }
};

const generateRandomNumberUsingStep = (maxNumber: number, step: number): number => {
  const a =  Math.floor(Math.random() * (maxNumber / step)) * step;
  return a;
};

export const getFoodPosition = (width: number, height: number, step: number): Position => {
  return {
    x: generateRandomNumberUsingStep(width, step),
    y: generateRandomNumberUsingStep(height, step)
  };
};

export const getFood = (): {foodImg: HTMLImageElement, foodType: FoodType} => {
  const menuSize = food.length;
  const selectedFood = Math.floor(Math.random() * menuSize);
  const foodImg = new Image();
  foodImg.src = food[selectedFood].imgSrc;
  const foodType = food[selectedFood].type;
  return {foodImg, foodType};
};

export const isCollisionWithTail = (snake: Snake): boolean => {
  let isCollision = false;
  const head = snake[0];
  const tail = [...snake];
  tail.shift();
  tail.forEach(tailEl => {
    if (tailEl.x === head.x && tailEl.y === head.y) {
      isCollision = true;
    }
  });
  return isCollision;
};

export const changeDirection = (direction: Direction): Direction => {
  let newDirection: Direction;
  if (direction !== Direction.DOWN) {
    newDirection = direction + 1;
  } else newDirection = Direction.LEFT;
  return newDirection;
};
