export const getRandomNumbersArray = (): number[] => {
  const length = Math.floor(Math.random() * 50 + 30);
  return Array.from({length: length}, () => Math.floor(Math.random() * 500));
};
