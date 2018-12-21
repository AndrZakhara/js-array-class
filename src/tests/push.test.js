import MyArray from '../index';


describe('tests for method push', () => {
  let arr = null;

  beforeEach(() => {
    arr = new MyArray(1, 2, 3);
  });


  test('instance should have method push', () => {
    expect(arr.push).toBeInstanceOf(Function);
  });

  test('instance has not own property push', () => {
    expect(Object.hasOwnProperty.call(arr, 'push')).toBeFalsy();
  });

  test('method returns new length', () => {
    const expectedLength = arr.length + 3;
    const newLength = arr.push(4, 5, 6);

    expect(newLength).toBe(expectedLength);
  });

  test('method must increment current length by 1, if 1 argument is put ', () => {
    const expectedLength = arr.length + 1;
    arr.push(2);

    expect(arr.length).toBe(expectedLength);
  });

  test('method doesn\'t change length, if 0 argument is put', () => {
    arr.push();

    expect(arr.length).toBe(3);
  });

  test('pushed element must be the last', () => {
    const a = 5;
    arr.push(a);

    expect(arr[3]).toBe(a);
  });

  test('should allow to add multiple items', () => {
    arr.push(4, 5, 6);

    expect(arr.length).toBe(6);
    expect(arr[3]).toBe(4);
    expect(arr[4]).toBe(5);
    expect(arr[5]).toBe(6);
  });

  test('push 1 element to an empty array, it`s length must be 1', () => {
    arr = new MyArray();

    expect(arr.push(1)).toBe(1);
    expect(arr.length).toBe(1);
  });

  test('returns undefined if there is no such index', () => {
    arr.push(5);

    expect(arr[arr.length]).toBeUndefined();
  });
});