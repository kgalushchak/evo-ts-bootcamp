import {mergeSort} from './mergeSort';
import {compareFunction} from './compareFunction';

describe('Test mergeSort', () => {
  it('asserts the array of numbers is sorted correctly', () => {
    expect(mergeSort([2, 65, 43, 14, 11, 34, 5, 2, 76], compareFunction)).toEqual([2,  2,  5, 11, 14, 34, 43, 65, 76]);
  });

  it('asserts the array of objects is sorted according to provided value', () => {
    const array = [
      {
        id: 443,
        name: 'dog',
        age: 8
      },
      {
        id: 248,
        name: 'elephant',
        age: 20
      },
      {
        id: 123,
        name: 'cat',
        age: 3
      }
    ];
    const expectedAge = [
      {
        id: 123,
        name: 'cat',
        age: 3
      },
      {
        id: 443,
        name: 'dog',
        age: 8
      },
      {
        id: 248,
        name: 'elephant',
        age: 20
      }
    ];
    const expectedId = [
      {
        id: 123,
        name: 'cat',
        age: 3
      },
      {
        id: 248,
        name: 'elephant',
        age: 20
      },
      {
        id: 443,
        name: 'dog',
        age: 8
      }
    ];
    expect(mergeSort(array, compareFunction, 'age')).toEqual(expectedAge);
    expect(mergeSort(array, compareFunction, 'id')).toEqual(expectedId);
  });
});
