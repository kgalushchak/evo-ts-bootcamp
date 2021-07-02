export type Position = {x: number, y:number};

export type EyesPosition = [Position, Position];

export type Snake = Position[];

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}
