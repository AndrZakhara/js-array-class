import MyArray from '../index';


describe('tests for method slice', () => {
  let arr = null;

  beforeEach(() => {
    arr = new MyArray(1, 2, 3, 4, 5, 6, 7);
  });


  test('instance has method slice', () => {
    expect(arr.slice).toBeInstanceOf(Function);
  });

  test('instance has not Own Property slice', () => {
    expect(Object.prototype.hasOwnProperty.call(arr, 'slice')).toBeFalsy();
  });

  test('method must return new array', () => {
    const initialArray = arr;

    expect(arr.slice()).not.toBe(initialArray);
    expect(arr.slice()).toEqual(initialArray);
  });

  test('new array must be an instance of My Array', () => {
    expect(arr.slice()).toBeInstanceOf(MyArray);
  });

  test('method can include 0, 1 or 2 arguments', () => {
    expect(arr.slice()).toEqual(new MyArray(1, 2, 3, 4, 5, 6, 7));
    expect(arr.slice(1)).toEqual(new MyArray(2, 3, 4, 5, 6, 7));
    expect(arr.slice(1, 3)).toEqual(new MyArray(2, 3));
  });

  test('if index is negative start from the end', () => {
    expect(arr.slice(-3, 6)).toEqual(new MyArray(5, 6));
    expect(arr.slice(-4, -2)).toEqual(new MyArray(4, 5));
  });

  test('if there is 1 argument copy array to end', () => {
    expect(arr.slice(3)).toEqual(new MyArray(4, 5, 6, 7));
  });

  test('if there is no arguments copy initial array', () => {
    expect(arr.slice()).toEqual(arr);
  });

  test('if the first element is null or undefined start from index 0', () => {
    expect(arr.slice(null, 5)).toEqual(new MyArray(1, 2, 3, 4, 5));
    expect(arr.slice(undefined, 3)).toEqual(new MyArray(1, 2, 3));
  });
});