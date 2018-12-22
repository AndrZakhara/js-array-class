import MyArray from '../index';


describe('tests for method pop', () => {
  let arr = null;

  beforeEach(() => {
    arr = new MyArray(1, 4, 0);
  });


  test('instance has method pop', () => {
    expect(arr.pop).toBeInstanceOf(Function);
  });

  test('instance has not Own Property pop', () => {
    expect(Object.prototype.hasOwnProperty.call(arr, 'pop')).toBeFalsy();
  });

  test('method must return deleted element', () => {
    expect(arr.pop()).toBe(0);
  });

  test('method must delete last element from array', () => {
    const deleted = arr.pop();

    expect(arr[3]).toBeUndefined();
    expect(deleted).toBe(0);
  });

  test('length of array must reduce by 1', () => {
    arr.pop();

    expect(arr.length).toBe(2);
  });

  test('must work correctly with empty array', () => {
    const arrEmpty = new MyArray();

    expect(arrEmpty.pop()).toBeUndefined();
  });

  test('empty array length always must be 0', () => {
    const arrEmpty = new MyArray();
    const { length: initialLength } = arrEmpty;

    arrEmpty.pop();
    arrEmpty.pop();

    const { length: finalLength } = arrEmpty;

    expect(initialLength).toBe(0);
    expect(finalLength).toBe(0);
  });
});