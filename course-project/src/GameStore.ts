import {action, makeAutoObservable} from 'mobx';
import {createContext} from './utils/storeUtils';
import {
  adjustSnakeLength,
  getEyesPosition,
  getFoodImage,
  getFoodPosition,
  isFoodEaten,
  moveSnake
} from './gameCalculations';
import {Direction, Position, Snake} from './types';

class GameStore {
  WIDTH = 900;
  HEIGHT = 600;
  STEP = 30;
  length = 3;
  speed = 300;
  direction: Direction = Direction.RIGHT;
  snake:  Snake = [
    {x: this.WIDTH/2, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - this.STEP, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - 2 * this.STEP, y: this.HEIGHT/2}
  ];
  food: Position = getFoodPosition(this.WIDTH, this.HEIGHT, this.STEP);
  foodImg: HTMLImageElement = getFoodImage();

  constructor() {
    makeAutoObservable(this, {
      setDirection: action.bound,
      draw: action.bound,
      drawSnake: action.bound,
      drawFood: action.bound,
      move: action.bound
    });
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  draw(context: CanvasRenderingContext2D) {
    this.drawFood(context);
    this.drawSnake(context);
  }

  //TODO move to separate file
  drawSnake(context: CanvasRenderingContext2D) {
    context.fillStyle = 'rgb(0, 255, 0)';
    context.strokeStyle = 'rgb(0, 200, 0)';
    this.snake.forEach(
      snakeEl => {
        context.fillRect(snakeEl.x, snakeEl.y, this.STEP, this.STEP);
        context.strokeRect(snakeEl.x, snakeEl.y, this.STEP, this.STEP);
      });

    const eyes = getEyesPosition(this.direction, this.snake[0].x, this.snake[0].y, this.STEP);
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
  }

  drawFood(context: CanvasRenderingContext2D){
    context.drawImage(this.foodImg, this.food.x, this.food.y, this.STEP, this.STEP);
  }

  move(context: CanvasRenderingContext2D) {
    this.snake = moveSnake(this.snake, this.direction, this.STEP, this.WIDTH, this.HEIGHT);
    context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    if (isFoodEaten(this.snake, this.food)) {
      this.snake = adjustSnakeLength(this.snake, this.direction, this.STEP);
      this.foodImg = getFoodImage();
      this.food = getFoodPosition(this.WIDTH, this.HEIGHT, this.STEP);
    }
    this.draw(context);
  }
}

export const { StoreProvider, useStore } = createContext({
  Game: new GameStore()
});
