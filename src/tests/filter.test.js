import MyArray from '../index';


describe('tests for method filter', () => {
  test('instance has method filter', () => {
    const arr = new MyArray(1, 4, 0);

    expect(arr.filter).toBeInstanceOf(Function);
  });

  test('instance has not Own Property filter', () => {
    const arr = new MyArray(1, 4, 0);

    expect(Object.prototype.hasOwnProperty.call(arr, 'filter')).toBeFalsy();
  });

  test('return value of no filter matches, returns empty array', () => {
    const arr = new MyArray(1, 3, 4);

    expect(arr.filter(item => item === 0)).toHaveLength(0);
  });

  test('expect callback args to be equal 3', () => {
    const arr = new MyArray(1, 3, 5, 8);
    const mockCallback = jest.fn();
    arr.filter(mockCallback);

    expect(mockCallback.mock.calls[0].length).toBe(3);
  });

  test('method does not mutate initial array', () => {
    const arr = new MyArray(5, 4, 3);
    arr.filter(num => num > 0);

    expect(arr).toEqual(new MyArray(5, 4, 3));
  });

  test('method must return new Array of current elements which are in check condition', () => {
    const arr = new MyArray(1, 4, 4, 5, 0, 0);
    const filtered = arr.filter(val => val >= 4);

    expect(filtered).toEqual(new MyArray(4, 4, 5));
  });

  test('callback has to be a function', () => {
    let isCallback = false;
    const callback = x => {
      isCallback = true;
      return x + 1;
    };

    new MyArray(1, 10, 20).filter(callback);

    expect(isCallback).toBe(true);
  });

  test('returns an empty array when called on empty array', () => {
    const arr = new MyArray();
    const mockCallback = jest.fn();
    const filtered = arr.filter(mockCallback);

    expect(filtered).toEqual(new MyArray());
  });

  test('if callback return false filter return empty array', () => {
    const arr = new MyArray(1, 2, 4);
    const filtered = arr.filter(val => val <= 0);

    expect(filtered).toEqual(new MyArray());
  });

  test('if custom context does not provided, use current context', () => {
    const arr = new MyArray(1, 4, 0);
    const testArr = [];
    const user = {
      name: 'ivan',
      testFilter() {
        arr.filter(() => testArr.push(this.name));
      }
    };

    user.testFilter();

    expect(testArr).toEqual(['ivan', 'ivan', 'ivan']);
  });

  test('thisArg is set as -this- of callbackFunction properly for filter method', () => {
    const arr = new MyArray(2, 6, 10, 12, 16);
    const checkNumericRange = function(value) {
      return typeof value === 'number' && (value >= this.minimum && value <= this.maximum);
    };

    const thisArg = { minimum: 10, maximum: 20 };
    const result = arr.filter(checkNumericRange, thisArg);

    expect(result).toEqual(new MyArray(10, 12, 16));
  });
});
