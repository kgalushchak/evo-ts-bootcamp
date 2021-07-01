import {action, makeAutoObservable} from 'mobx';
import {createContext} from './utils/storeUtils';
import {getEyesPosition, getFoodPosition, moveSnake} from './gameCalculations';
import {Direction, Snake} from './types';

class GameStore {
  WIDTH = 1000;
  HEIGHT = 600;
  STEP = 20;
  length = 3;
  direction: Direction = Direction.RIGHT;
  snake:  Snake = [
    {x: this.WIDTH/2, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - this.STEP, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - 2 * this.STEP, y: this.HEIGHT/2}
  ];

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
    this.drawSnake(context);
    // this.drawFood(context);
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
        context.arc(eye.x, eye.y, 4, 0 , 2 * Math.PI);
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
    const food = getFoodPosition(this.HEIGHT, this.WIDTH, this.STEP);
    context.beginPath();
    context.fillStyle = 'rgb(255, 0, 0)';
    context.arc(food.x, food.y, this.STEP/2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  move(context: CanvasRenderingContext2D) {
    this.snake = moveSnake(this.snake, this.direction, this.STEP);
    context.clearRect(0, 0, this.WIDTH, this.HEIGHT); //TODO adjust as food also will be cleared when whole canvas is cleared
    this.draw(context);
  }
}

export const { StoreProvider, useStore } = createContext({
  Game: new GameStore()
});
