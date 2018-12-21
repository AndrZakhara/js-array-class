import MyArray from '../index.js';


describe('tests for method forEach', () => {
  let arr = null;

  beforeEach(() => {
    arr = new MyArray(1, 4, 0);
  });


  test('has method forEach ', () => {
    expect(arr.forEach).toBeInstanceOf(Function);
  });

  test('instance has not Own Property forEach ', () => {
    expect(Object.prototype.hasOwnProperty.call(arr, 'forEach')).toBeFalsy();
  });

  test('does not mutate initial arr if we do nothing inside the cb ', () => {
    arr.forEach(a => a);

    expect(arr).toEqual(new MyArray(1, 4, 0));
  });

  test('if custom context doesn\'t provided, use current context ', () => {
    const testArr = [];
    const user = {
      name: 'ivan',
      testForEach() {
        arr.forEach(() => testArr.push(this.name));
      }
    };

    user.testForEach();

    expect(testArr).toEqual(['ivan', 'ivan', 'ivan']);
  });

  test('callback is executed once for each element in the array ', () => {
    const mockCallback = jest.fn();

    arr.forEach(mockCallback);

    expect(mockCallback.mock.calls[0][0]).toBe(arr[0]);
    expect(mockCallback.mock.calls[1][0]).toBe(arr[1]);
    expect(mockCallback.mock.calls[2][0]).toBe(arr[2]);
  });

  test('expect callback args to be equal 3', () => {
    const mockCallback = jest.fn();

    arr.forEach(mockCallback);

    expect(mockCallback.mock.calls[0].length).toBe(3);
    expect(mockCallback.mock.calls[1].length).toBe(3);
    expect(mockCallback.mock.calls[2].length).toBe(3);
  });

  test('It should pass in the index of each position in originalArray as second argument to callback ', () => {
    const mockCallback = jest.fn();

    arr.forEach(mockCallback);

    expect(mockCallback.mock.calls[0][1]).toBe(0);
    expect(mockCallback.mock.calls[1][1]).toBe(1);
    expect(mockCallback.mock.calls[2][1]).toBe(2);
  });

  test('method should return undefined ', () => {
    const mockCallback = jest.fn((v, i, arr) => i);

    expect(arr.forEach(mockCallback)).toBeUndefined();
  });

  test('thisArg is set as this of callbackFunction properly for forEach method ', () => {
    const testArr = [];
    const user2 = {
      name: 'ivan2'
    };
    const user = {
      name: 'ivan',
      testForEach() {
        arr.forEach(function() {
          testArr.push(this.name);
        }, user2);
      }
    };

    user.testForEach();

    expect(testArr).toEqual(['ivan2', 'ivan2', 'ivan2']);
  });

  test('if callback isn\'t a function, throw error', () => {
    const callback = 1;

    expect(() => {
      arr.forEach(callback);
    }).toThrow(TypeError);
  });
});