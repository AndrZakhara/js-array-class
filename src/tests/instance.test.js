import MyArray from '../index';

describe('tests for instance', () => {
  let arr = null;

  beforeEach(() => {
    arr = new MyArray(1, 4, 0, 'orange', { a: 'name', b: 'user' });
  });

  test('The instance must return a specific value for a particular array index.', () => {
    expect(arr[3]).toBe('orange');
  });

  test('The instance mustn\'t be an instance of the class \'Array\'', () => {
    expect(arr instanceof Array).toBeFalsy();
    expect(arr).toBeInstanceOf(MyArray);
  });

  test('Instance dosn\'t have any own property except length', () => {
    const myArr = new MyArray();

    expect(Object.keys(myArr).length).toBe(1);
    expect(myArr).toHaveProperty('length');
  });

  test('Prototype have only declarated method and constructor', () => {
    const declaratedMethods = {
      'constructor': true,
      'find': true,
      'slice': true,
      'pop': true,
      'push': true,
      'toString': true,
      'map': true,
      'filter': true,
      'forEach': true,
      'reduce': true,
      'sort': true,
      [Symbol.iterator]: true
    };

    Reflect.ownKeys(MyArray.prototype).forEach(item => delete declaratedMethods[item]);
    expect(declaratedMethods).toEqual({});
    expect(Reflect.ownKeys(MyArray.prototype).length).toBe(12);
  });

  test('Class has only declarated static method and common like \'length\', \'prototype\', \'from\', \'name\'', () => {
    const declaratedMethods = ['length', 'prototype', 'from', 'name'];
    const staticMethods = Reflect.ownKeys(MyArray);

    expect(staticMethods).toEqual(declaratedMethods);
  });
});