import {action, makeAutoObservable} from 'mobx';
import {createContext} from './utils/storeUtils';
import {Direction, Food, FoodType, GameStatus, Position, Snake} from './types';
import {
  adjustSnakeLength,
  changeDirection,
  getFood,
  getFoodPosition,
  getInitialSnakePosition,
  isCollisionWithTail,
  isFoodEaten,
  moveSnake
} from './gameCalculations';
import {getScore} from './scoreCalculations';
import {drawFood, drawSnake} from './draw';

export const WIDTH = 900;
export const HEIGHT = 600;
export const STEP = 30;
const MIN_MOVE_TIMEOUT = 100;
const MOVE_TIMEOUT_CHANGE_STEP = 50;

class GameStore {
  moveTimeout = 400;
  gameStatus: GameStatus = GameStatus.NOT_STARTED;
  direction: Direction = Direction.RIGHT;
  snake:  Snake = getInitialSnakePosition(WIDTH, HEIGHT, STEP);
  foodPosition: Position = getFoodPosition(WIDTH, HEIGHT, STEP, this.snake);
  food: Food = getFood();
  score = 0;
  highScore = 0;
  highScoreHit = false;

  constructor() {
    makeAutoObservable(this, {
      setDirection: action.bound,
      draw: action.bound,
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

  draw(context: CanvasRenderingContext2D) {
    drawFood(context, this.food, this.foodPosition);
    drawSnake(context, this.snake, this.direction);
  }

  move(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    if (isFoodEaten(this.snake, this.foodPosition)) {
      this.score = this.score + getScore(this.moveTimeout, this.snake.length);
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
      this.foodPosition = getFoodPosition(WIDTH, HEIGHT, STEP, this.snake);
    } else {
      this.snake = moveSnake(this.snake, this.direction, STEP, WIDTH, HEIGHT);
    }
    this.draw(context);
    if (isCollisionWithTail(this.snake)) {
      this.gameStatus = GameStatus.ENDED;
      if (this.score > this.highScore) {
        this.highScoreHit = true;
        this.highScore = this.score;
      }
    }
  }

  resetGame() {
    this.gameStatus = GameStatus.ACTIVE;
    this.moveTimeout = 400;
    this.direction = Direction.RIGHT;
    this.snake = getInitialSnakePosition(WIDTH, HEIGHT, STEP);
    this.foodPosition = getFoodPosition(WIDTH, HEIGHT, STEP, this.snake);
    this.food = getFood();
    this.score = 0;
    this.highScoreHit = false;
  }
}

export const { StoreProvider, useStore } = createContext({
  Game: new GameStore()
});
