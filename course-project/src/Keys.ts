import {Direction} from './store';

export enum Keys {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

export const Directions: Map<Keys, Direction> = new Map ([
  [Keys.ArrowLeft, Direction.LEFT],
  [Keys.ArrowRight, Direction.RIGHT],
  [Keys.ArrowUp, Direction.UP],
  [Keys.ArrowDown, Direction.DOWN],
]);
