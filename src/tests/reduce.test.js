import MyArray from '../index';


describe('tests for method reduce', () => {
  test('instance has method reduce', () => {
    const arr = new MyArray(1, 4, 0);

    expect(arr.reduce).toBeInstanceOf(Function);
  });

  test('instance has not own property reduce', () => {
    const arr = new MyArray(1, 4, 0);

    expect(Object.prototype.hasOwnProperty.call(arr, 'reduce')).toBeFalsy();
  });

  test('Method shouldn\'t mutate initial array', () => {
    const arr = new MyArray(1, 2, 3);
    const mockCallback = jest.fn();
    arr.reduce(mockCallback);
    const newArray = new MyArray(1, 2, 3);
    expect(arr).toEqual(newArray);
  });

  test('If callback is not a function the error should be thrown', () => {
    const callback = 1212121;
    const arr = new MyArray(1, 4, 4, 5, 0, 0);

    expect(() => {
      arr.reduce(callback);
    }).toThrow();
  });

  test('If an array is empty but there is an InitialValue as a parameter', () => {
    const arr = new MyArray();
    const mockCallback = jest.fn();
    const thisArg = { minimum: 10, maximum: 20 };
    const result = arr.reduce(mockCallback, thisArg);

    expect(result).toEqual(thisArg);
  });

  test('reduce callback takes first element as a value of first parameter if initialValue is not passed', () => {
    const arr = new MyArray(1, 2);
    const mockCallback = jest.fn(accum => 0);
    arr.reduce(mockCallback);

    expect(mockCallback.mock.calls[0][0]).toEqual(1);
  });

  test(`If array is empty and InitialValue is specified, 
    callback shouldn/'t  be called, and methods result should be ItitialValue`, () => {
    const arr = new MyArray();
    const callReduceOnEmptyArray = () => {
      arr.reduce(() => ({}));
    };

    expect(callReduceOnEmptyArray).toThrow(TypeError);
  });

  test.only(`the number of callback function calls should be 
    equal to the arr.length with init value and arr.length-1 without`, () => {
    const arr = new MyArray(1, 2, 3, 5);
    const mockCallbackWithInitValue = jest.fn();
    const mockCallbackWithOutInitValue = jest.fn();

    arr.reduce(mockCallbackWithInitValue, 0);
    expect(mockCallbackWithInitValue.mock.calls.length).toBe(4);

    arr.reduce(mockCallbackWithOutInitValue);
    expect(mockCallbackWithOutInitValue.mock.calls.length).toBe(3);
  });

  describe('tests for initial value', () => {
    test('initial value is null', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn();
      arr.reduce(mockCallback, null);

      expect(mockCallback.mock.calls[0][0]).toBeNull();
    });

    test('initial value is false', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn();
      arr.reduce(mockCallback, false);

      expect(mockCallback.mock.calls[0][0]).toBeFalsy();
    });

    test('initial value is 0', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn();
      arr.reduce(mockCallback, 0);

      expect(mockCallback.mock.calls[0][0]).toEqual(0);
    });

    test('initial value is \'\'', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn();
      arr.reduce(mockCallback, '');

      expect(mockCallback.mock.calls[0][0]).toEqual('');
    });

    test('initial value is NaN', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn();
      arr.reduce(mockCallback, NaN);

      expect(mockCallback.mock.calls[0][0]).toEqual(NaN);
    });
  });
});
