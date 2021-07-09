import {action, makeAutoObservable} from 'mobx';
import {createContext} from './utils/storeUtils';
import {
  adjustSnakeLength,
  changeDirection,
  getEyesPosition,
  getFood,
  getFoodPosition,
  getInitialSnakePosition,
  isCollisionWithTail,
  isFoodEaten,
  moveSnake
} from './gameCalculations';
import {Direction, FoodType, GameStatus, Position, Snake} from './types';

export const WIDTH = 900;
export const HEIGHT = 600;
export const STEP = 30;
const MIN_MOVE_TIMEOUT = 50;
const MOVE_TIMEOUT_CHANGE_STEP = 100;

class GameStore {
  moveTimeout = 500;
  gameStatus: GameStatus = GameStatus.NOT_STARTED;
  direction: Direction = Direction.RIGHT;
  snake:  Snake = getInitialSnakePosition(WIDTH, HEIGHT, STEP);
  foodPosition: Position = getFoodPosition(WIDTH, HEIGHT, STEP);
  food = getFood();

  constructor() {
    makeAutoObservable(this, {
      setDirection: action.bound,
      setGameStatus: action.bound,
      draw: action.bound,
      drawSnake: action.bound,
      drawFood: action.bound,
      move: action.bound,
      resetGame: action.bound
    });
  }

  setDirection(direction: Direction) {
    if ((this.direction === Direction.RIGHT || this.direction === Direction.LEFT)
      && (direction === Direction.RIGHT || direction === Direction.LEFT)) return;
    if ((this.direction === Direction.UP || this.direction === Direction.DOWN)
      && (direction === Direction.UP || direction === Direction.DOWN)) return;
    this.direction = direction;
  }

  setGameStatus(gameStatus: GameStatus) {
    this.gameStatus = gameStatus;
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
        context.fillRect(snakeEl.x, snakeEl.y, STEP, STEP);
        context.strokeRect(snakeEl.x, snakeEl.y, STEP, STEP);
      });

    const eyes = getEyesPosition(this.direction, this.snake[0].x, this.snake[0].y, STEP);
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
    context.drawImage(this.food.foodImg, this.foodPosition.x, this.foodPosition.y, STEP, STEP);
  }

  move(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    if (isFoodEaten(this.snake, this.foodPosition)) {
      this.snake = adjustSnakeLength(this.snake, this.direction, STEP, WIDTH, HEIGHT);
      if (this.food.foodType === FoodType.DRUG) {
        this.direction = changeDirection(this.direction);
      } else if (this.food.foodType === FoodType.FAST_FOOD) {
        this.snake = adjustSnakeLength(this.snake, this.direction, STEP, WIDTH, HEIGHT);
        this.snake = adjustSnakeLength(this.snake, this.direction, STEP, WIDTH, HEIGHT);
      } else if (this.food.foodType === FoodType.ENERGY_DRINK) {
        if (this.moveTimeout >= MIN_MOVE_TIMEOUT + MOVE_TIMEOUT_CHANGE_STEP) {
          this.moveTimeout = this.moveTimeout - MOVE_TIMEOUT_CHANGE_STEP;
        }
      }
      this.food = getFood();
      this.foodPosition = getFoodPosition(WIDTH, HEIGHT, STEP);
    } else {
      this.snake = moveSnake(this.snake, this.direction, STEP, WIDTH, HEIGHT);
    }
    this.draw(context);
    if (isCollisionWithTail(this.snake)) {
      this.gameStatus = GameStatus.ENDED;
    }
  }

  resetGame() {
    this.gameStatus = GameStatus.ACTIVE;
    this.moveTimeout = 500;
    this.direction = Direction.RIGHT;
    this.snake = getInitialSnakePosition(WIDTH, HEIGHT, STEP);
    this.foodPosition = getFoodPosition(WIDTH, HEIGHT, STEP);
    this.food = getFood();
  }
}

export const { StoreProvider, useStore } = createContext({
  Game: new GameStore()
});
