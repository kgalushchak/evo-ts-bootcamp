export type Position = {x: number, y:number};

export type EyesPosition = [Position, Position];

export type Snake = Position[];

export type Food = {
  imgSrc: string,
  type: FoodType
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
  FRUIT ,
  DRUG,
  ENERGY_DRINK,
  FAST_FOOD
}
