import {action, makeAutoObservable} from 'mobx';
import {createContext} from './utils/storeUtils';
import {getEyesPosition} from './game';

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

class Game {
  WIDTH = 1000;
  HEIGHT = 600;
  STEP = 20;
  length = 3;
  direction: Direction = Direction.RIGHT;
  snake: Array<{x: number, y:number}> = [
    {x: this.WIDTH/2, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - this.STEP, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - 2 * this.STEP, y: this.HEIGHT/2}
  ];

  constructor() {
    makeAutoObservable(this, {
      setDirection: action.bound,
      draw: action.bound
    });
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'rgb(0, 200, 0)';
    context.strokeStyle = 'rgb(0, 0, 0)';
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
}

export const { StoreProvider, useStore } = createContext({
  Game: new Game()
});
