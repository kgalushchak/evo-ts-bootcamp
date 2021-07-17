const SpeedCoefficients: Map<number, number> = new Map([ // mapping moveTimeout to score coefficient
  [400, 20],
  [350, 50],
  [300, 100],
  [250, 250],
  [200, 500],
  [150, 1000],
  [100, 1500],
]);

export const getScore = (moveTimeout: number, snakeLength: number): number => {
  const speedCoefficient: number = SpeedCoefficients.get(moveTimeout) || 20;
  const lengthCoefficient: number = snakeLength * 10;
  return speedCoefficient + lengthCoefficient;
};
