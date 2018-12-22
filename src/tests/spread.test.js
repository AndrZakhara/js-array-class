import MyArray from '../index';


describe('tests for spread', () => {
  test('instance has method [Symbol.iterator]', () => {
    const arr = new MyArray(1, 2, 3);

    expect(arr[Symbol.iterator]).toBeInstanceOf(Function);
  });

  test('instance has not own property [Symbol.iterator]', () => {
    const arr = new MyArray(1, 2, 3);

    expect(Object.prototype.hasOwnProperty.call(arr, 'Symbol.iterator')).toBeFalsy();
  });

  test('array must work with operator spread', () => {
    const arr2 = new MyArray(1, 4, { name: 'ivan' });
    const arr1 = [0, ...arr2];

    expect(arr1[0]).toBe(0);
    expect(arr1[1]).toBe(1);
    expect(arr1[2]).toBe(4);
    expect(arr1[3]).toEqual({ name: 'ivan' });
  });
});