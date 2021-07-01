export type EyesPosition = [{x: number, y:number}, {x: number, y:number}];

export type Snake = Array<{x: number, y:number}>;

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}
