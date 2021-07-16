import {getEyesPosition} from './gameCalculations';
import {STEP} from './GameStore';
import {Direction, Food, Position, Snake} from './types';

export const drawSnake = (context: CanvasRenderingContext2D, snake: Snake, direction: Direction) => {
  context.fillStyle = 'rgb(0, 255, 0)';
  context.strokeStyle = 'rgb(0, 200, 0)';
  snake.forEach(
    snakeEl => {
      context.fillRect(snakeEl.x, snakeEl.y, STEP, STEP);
      context.strokeRect(snakeEl.x, snakeEl.y, STEP, STEP);
    });

  const eyes = getEyesPosition(direction, snake[0].x, snake[0].y, STEP);
  eyes.forEach(
    eye => {
      context.beginPath();
      context.fillStyle = 'rgb(255, 255, 255)';
      context.strokeStyle = 'rgb(0, 0, 0)';
      context.arc(eye.x, eye.y, 5, 0 , 2 * Math.PI);
      context.stroke();
      context.fill();
      context.closePath();

      context.beginPath();
      context.fillStyle = 'rgb(0, 0, 0)';
      context.arc(eye.x, eye.y, 2, 0 , 2 * Math.PI);
      context.fill();
      context.closePath();
    }
  );
};

export const drawFood = (context: CanvasRenderingContext2D, food: Food, foodPosition: Position) => {
  context.drawImage(food.foodImg, foodPosition.x, foodPosition.y, STEP, STEP);
};
