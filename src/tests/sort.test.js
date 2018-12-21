import MyArray from '../index';


describe('tests for method sort', () => {
  test('instance has method sort', () => {
    const arr = new MyArray(1, 4, 0);

    expect(arr.sort).toBeInstanceOf(Function);
  });

  test('arr has not own property sort', () => {
    const arr = new MyArray(1, 4, 0);

    expect(Object.prototype.hasOwnProperty.call('sort')).toBeFalsy();
  });

  test('throw error if comparator is not a function or undefined', () => {
    const arr = new MyArray(1, 2, 3);

    expect(() => arr.sort('is not a comparator')).toThrow(TypeError);
  });

  test('should work correctly with comparator', () => {
    const arr = new MyArray(4, 1, 3);
    const comparator = jest.fn((a, b) => a - b);

    arr.sort(comparator);

    expect(arr).toEqual(new MyArray(1, 3, 4));
  });

  test('comparator must accepts two arguments', () => {
    const arr = new MyArray(4, 1, 3);
    const comparator = jest.fn();

    arr.sort(comparator);

    expect(comparator.mock.calls[0].length).toBe(2);
  });

  test('should work correctly without comparator', () => {
    const arr = new MyArray('b', 'c', 'a');
    const arr2 = new MyArray(1, 2, 11, 12);

    arr.sort();
    arr2.sort();

    expect(arr).toEqual(new MyArray('a', 'b', 'c'));
    expect(arr2).toEqual(new MyArray(1, 11, 12, 2));
  });

  test('string elements should be sorted by UNICODE', () => {
    const arr = new MyArray('h', 'd', 'm');
    arr.sort();

    expect(arr[0]).toEqual('d');
  });

  test('undefined shoud be at the end of array', () => {
    const arr1 = new MyArray(undefined, 3, undefined, 2, undefined, 1);
    const arr2 = new MyArray(3, undefined, 2, undefined, 1);
    const arr3 = new MyArray(3, undefined, 2, 1);

    arr1.sort();
    arr2.sort();
    arr3.sort();

    expect(arr3[arr3.length - 1]).toEqual(undefined);
    expect(arr2).toEqual(new MyArray(1, 2, 3, undefined, undefined));
    expect(arr1).toEqual(new MyArray(1, 2, 3, undefined, undefined, undefined));
  });

  test('arr length before using sort === arr length after using it', () => {
    const { length: initialLength } = new MyArray(3, 2, 1);
    const { length: expectedLength } = new MyArray(3, 2, 1).sort();

    expect(initialLength).toBe(expectedLength);
  });

  test('numbers should be sorted as strings without comparator', () => {
    const arr = new MyArray(1, 2, 10, 21);

    arr.sort();

    expect(arr).toEqual(new MyArray(1, 10, 2, 21));
  });

  test('numbers should be sorted as numbers with comparator', () => {
    const arr1 = new MyArray(1, 10, 2, 21);
    const arr2 = new MyArray(3, 40, 24, 1);

    expect(arr1.sort((a, b) => a - b)).toEqual(new MyArray(1, 2, 10, 21));
    expect(arr2.sort((a, b) => b - a)).toEqual(new MyArray(40, 24, 3, 1));
  });

  test('arr should be mutated', () => {
    const arr = new MyArray(1, 2, 10, 21);

    arr.sort();

    expect(arr).toEqual(new MyArray(1, 10, 2, 21));
  });
});