export function compareFunction<T> (a: T, b: T, val?: keyof T): number {
  let aValue, bValue;

  if (val) {
    aValue = a[val];
    bValue = b[val];
  } else {
    aValue = a;
    bValue = b;
  }
  if (aValue > bValue) {
    return 1;
  } else if (aValue < bValue) {
    return -1;
  } else {
    return 0;
  }
}
