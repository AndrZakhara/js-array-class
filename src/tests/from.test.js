import MyArray from '../index';

describe('tests for method FROM', () => {
  test('Class has static method FROM', () => {
    expect(MyArray.from).toBeInstanceOf(Function);
  });

  test('Instance has not Own Property FROM', () => {
    const arr = new MyArray(1, 4, 0);

    expect(Object.prototype.hasOwnProperty.call(MyArray, 'from')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(arr, 'from')).toBeFalsy();
  });

  test('If custom context is provided, use provided context', () => {
    const objectAside = { 0: 2 };
    const arr = MyArray.from(
      [10, 20, 30],
      function(x) {
        return x + this[0];
      },
      objectAside
    );

    expect(arr).toEqual(new MyArray(12, 22, 32));
  });

  test('Method FROM must return new instance of MyArray with current elements', () => {
    const arr = MyArray.from([10, 20, 30]);
    const arrControl = new MyArray(10, 20, 30);

    expect(arr).toBeInstanceOf(MyArray);
    expect(arr).toEqual(arrControl);
  });

  test('Method FROM can include 1, 2 or 3 arguments', () => {
    const arr1 = MyArray.from([10, 20, 30]);
    const arr2 = MyArray.from([10, 20, 30], function(x) {
      return x + 1;
    });
    const objectAside = { 0: 2 };
    const arr3 = MyArray.from(
      [10, 20, 30],
      function(x) {
        return this[0] + x;
      },
      objectAside
    );

    expect(arr1).toEqual(new MyArray(10, 20, 30));
    expect(arr2).toEqual(new MyArray(11, 21, 31));
    expect(arr3).toEqual(new MyArray(12, 22, 32));
  });

  test('Elements\' order in \'a\' should be the same as in arrayLike', () => {
    const baseArr = [1, 2, 3];
    const arrayLine = MyArray.from(baseArr);

    expect(baseArr[0]).toBe(arrayLine[0]);
    expect(baseArr[1]).toBe(arrayLine[1]);
    expect(baseArr[2]).toBe(arrayLine[2]);
  });
});