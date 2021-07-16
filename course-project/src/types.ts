export type Position = {x: number, y:number};

export type EyesPosition = [Position, Position];

export type Snake = Position[];

export type FoodTemplate = {
  imgSrc: string,
  type: FoodType
};

export type Food = {
  foodImg: HTMLImageElement,
  foodType: FoodType
};

export enum Direction {
  LEFT,
  UP,
  RIGHT,
  DOWN
}

export enum GameStatus {
  NOT_STARTED,
  ACTIVE,
  ENDED
}

export enum FoodType {
  FRUIT,
  DRUG,
  ENERGY_DRINK,
  FAST_FOOD
}
