import MyArray from '../index';


describe('tests for method find', () => {
  test('returns undefined if there is no such element', () => {
    const arr = new MyArray(2, 4, 5);
    const callback = x => x > 10;

    expect(arr.find(callback)).toBeUndefined();
  });

  test('returns the first element that satisfies the expression', () => {
    const arr = new MyArray(1, 2, 3);
    const callback = x => x > 1;

    expect(arr.find(callback)).toBe(2);
  });

  test('throw error if callback is not a function', () => {
    const arr = new MyArray(1, 2, 3);
    const callback = '';

    expect(() => arr.find(callback)).toThrow(TypeError);
  });

  test('expect callbacks args length to be equal 3', () => {
    const arr = new MyArray(1, 2, 3);
    const callback = jest.fn();
    arr.find(callback);

    expect(callback.mock.calls.length).toBe(3);
  });

  test('callback must include the originalArray as third argument', () => {
    const originArr = new MyArray(1, 4, 0);
    const callback = jest.fn();
    originArr.find(callback);

    expect(callback.mock.calls[0][2]).toBe(originArr);
    expect(callback.mock.calls[1][2]).toBe(originArr);
    expect(callback.mock.calls[2][2]).toBe(originArr);
  });

  test('instance has not Own Property map', () => {
    const arr = new MyArray(1, 4, 0);

    expect(Object.prototype.hasOwnProperty.call(arr, 'find')).toBeFalsy();
  });

  test('instance has method find', () => {
    const arr = new MyArray(1, 4, 0);

    expect(arr.find).toBeInstanceOf(Function);
  });
});