import {action, makeAutoObservable} from 'mobx';
import {createContext} from './utils/storeUtils';
import {
  adjustSnakeLength,
  changeDirection,
  getEyesPosition,
  getFood,
  getFoodPosition,
  isCollisionWithTail,
  isFoodEaten,
  moveSnake
} from './gameCalculations';
import {Direction, FoodType, GameStatus, Position, Snake} from './types';

const MIN_MOVE_TIMEOUT = 50;
const MOVE_TIMEOUT_CHANGE_STEP = 100;

class GameStore {
  WIDTH = 900;
  HEIGHT = 600;
  STEP = 30;
  moveTimeout = 500;
  gameStatus: GameStatus = GameStatus.ACTIVE;
  direction: Direction = Direction.RIGHT;
  snake:  Snake = [
    {x: this.WIDTH/2, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - this.STEP, y: this.HEIGHT/2},
    {x: this.WIDTH/2 - 2 * this.STEP, y: this.HEIGHT/2}
  ];
  foodPosition: Position = getFoodPosition(this.WIDTH, this.HEIGHT, this.STEP);
  food = getFood();

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
    if ((this.direction === Direction.RIGHT || this.direction === Direction.LEFT)
      && (direction === Direction.RIGHT || direction === Direction.LEFT)) return;
    if ((this.direction === Direction.UP || this.direction === Direction.DOWN)
      && (direction === Direction.UP || direction === Direction.DOWN)) return;
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
    context.drawImage(this.food.foodImg, this.foodPosition.x, this.foodPosition.y, this.STEP, this.STEP);
  }

  move(context: CanvasRenderingContext2D) {
    this.snake = moveSnake(this.snake, this.direction, this.STEP, this.WIDTH, this.HEIGHT);
    context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    if (isFoodEaten(this.snake, this.foodPosition)) {
      this.snake = adjustSnakeLength(this.snake, this.direction, this.STEP, this.WIDTH, this.HEIGHT);
      if (this.food.foodType === FoodType.DRUG) {
        this.direction = changeDirection(this.direction);
      } else if (this.food.foodType === FoodType.FAST_FOOD) {
        this.snake = adjustSnakeLength(this.snake, this.direction, this.STEP, this.WIDTH, this.HEIGHT);
        this.snake = adjustSnakeLength(this.snake, this.direction, this.STEP, this.WIDTH, this.HEIGHT);
      } else if (this.food.foodType === FoodType.ENERGY_DRINK) {
        if (this.moveTimeout >= MIN_MOVE_TIMEOUT + MOVE_TIMEOUT_CHANGE_STEP) {
          this.moveTimeout = this.moveTimeout - MOVE_TIMEOUT_CHANGE_STEP;
        }
      }
      this.food = getFood();
      this.foodPosition = getFoodPosition(this.WIDTH, this.HEIGHT, this.STEP);
    }
    this.draw(context);
    if (isCollisionWithTail(this.snake)) {
      this.gameStatus = GameStatus.ENDED;
    }
  }
}

export const { StoreProvider, useStore } = createContext({
  Game: new GameStore()
});
