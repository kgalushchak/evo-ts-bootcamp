type CompareFunction<T> = (a: T, b: T, val?: keyof T) => number;

export function mergeSort<T> (array: T[], compareFunction: CompareFunction<T>, val?: keyof T): T[] {
  //split array
  if (array.length <= 1) return array;
  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle), compareFunction, val);
  const right = mergeSort(array.slice(middle), compareFunction, val);
  // combine arrays
  const combined: T[] = [];
  while (left.length && right.length) {
    if (compareFunction(left[0], right[0], val) === -1) combined.push(left.shift()!);
    else combined.push(right.shift()!);
  }
  return combined.concat(left.slice().concat(right.slice()));
}
