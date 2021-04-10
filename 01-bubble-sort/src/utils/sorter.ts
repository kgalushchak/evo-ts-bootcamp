export const sort = (array: number[]): number[] => {
  const  length  = array.length;

  for(let i = 0; i < length; i++ ) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j+1]) {
        const tmp = array[j];
        array[j] = array[j+1];
        array[j+1] = tmp;
        return array;
      }
    }
  }
  return array;
};

