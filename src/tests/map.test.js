import MyArray from '../index';


describe('tests for method map', () => {
  test('instance has method map', () => {
    const arr = new MyArray(1, 4, 0);

    expect(arr.map).toBeInstanceOf(Function);
  });

  test('instance has not Own Property map', () => {
    const arr = new MyArray(1, 4, 0);

    expect(Object.prototype.hasOwnProperty.call(arr, 'map')).toBeFalsy();
  });

  test('callback must include the originalArray as third argument', () => {
    const mockCallback = jest.fn();
    const originArr = new MyArray(1, 4, 0);
    originArr.map(mockCallback);

    expect(mockCallback.mock.calls[0][2]).toEqual(originArr);
    expect(mockCallback.mock.calls[1][2]).toEqual(originArr);
    expect(mockCallback.mock.calls[2][2]).toEqual(originArr);
  });

  test('method map must return an instance of MyArray', () => {
    const arr = new MyArray(1, 4, 0);

    expect(arr.map(num => num + 5)).toBeInstanceOf(MyArray);
  });

  test('should use callback for each element of array', () => {
    const mockCallback = jest.fn(num => num * 10);
    const arr = new MyArray(5, 4, 3);
    arr.map(mockCallback);

    expect(mockCallback.mock.results[0].value).toBe(50);
    expect(mockCallback.mock.results[1].value).toBe(40);
    expect(mockCallback.mock.results[2].value).toBe(30);
  });

  test('method map shouldn\'t mutate initial array', () => {
    const arr = new MyArray(5, 4, 3);
    arr.map(num => num + 1);

    expect(arr).toEqual(new MyArray(5, 4, 3));
  });

  test('returns an empty array when called on empty array', () => {
    const arr = new MyArray();

    expect(arr.map(num => num + 1)).toEqual(new MyArray());
    expect(arr.map(num => num + 1).length).toBe(0);
  });

  test('if custom context doesn\'t provided, use current context', () => {
    const arr = new MyArray(1, 4, 0);
    const testArr = [];
    const user = {
      name: 'ivan',
      testMap() {
        arr.map(() => testArr.push(this.name));
      }
    };

    user.testMap();

    expect(testArr).toEqual(['ivan', 'ivan', 'ivan']);
  });

  test('thisArg is set as \'this\' of mapFunction properly for map method', () => {
    const originArr = new MyArray(1, 4, 0);
    const customContext = { test: 10 };

    function callback() {
      return this.test;
    }

    const resultArr = originArr.map(callback, customContext);

    expect(resultArr).toEqual(new MyArray(10, 10, 10));
  });

  test('expect callbacks args length to be equal 3', () => {
    const mockCallback = jest.fn();
    const arr = new MyArray(1, 2, 3);
    arr.map(mockCallback);

    expect(mockCallback.mock.calls.length).toBe(3);
  });

  test('should throw error if callback is not a function', () => {
    const callback = '';
    const arr = new MyArray(1, 2, 3);

    expect(() => arr.map(callback)).toThrow(TypeError);
  });
});