import MyArray from '../index';


describe('tests for method toString', () => {
  let arr = null;

  beforeEach(() => {
    arr = new MyArray(1, 2, 3, 4);
  });

  test('instance has method toString', () => {
    expect(arr.toString).toBeInstanceOf(Function);
  });

  test('instance has not Own Property toString', () => {
    expect(Object.prototype.hasOwnProperty.call(arr, 'toString')).toBeFalsy();
  });

  test('the toString result of empty arr must be an empty string and not undefined', () => {
    arr = new MyArray(0);

    expect(arr.toString()).toBe('');
    expect(arr.toString()).not.toBeUndefined();
  });

  test('method should return a string', () => {
    expect(typeof arr.toString()).toBe('string');
  });

  test('returns a comma separated list of elements', () => {
    expect(arr.toString()).toBe('1,2,3,4');
  });
});