const SpeedCoefficients: Map<number, number> = new Map([ // mapping moveTimeout to score coefficient
  [350, 20],
  [300, 50],
  [250, 100],
  [200, 250],
  [150, 500],
  [100, 1500],
]);

export const getScore = (moveTimeout: number, snakeLength: number): number => {
  const speedCoefficient: number = SpeedCoefficients.get(moveTimeout) || 20;
  const lengthCoefficient: number = snakeLength * 10;
  return speedCoefficient + lengthCoefficient;
};
