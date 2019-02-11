// interface IFilterFunction<T> extends CallableFunction {
//   (arg1: T, arg2: number, arg3: MyArray<T>): boolean;
// }

interface IMyArray<T> {
  length:number;
  [index: number]: T;
  pop(): T;
  push(...rest: T[]): number;
  reduce<U>(callback: (arg0: U, arg1: T, arg2: number, arg3: MyArray<T>) => U, initialValue?: U): U;
  slice(begin?: number, end?: number): MyArray<T>;
  sort(callback?: (arg0: T, arg1: T) => number): MyArray<T>;
  forEach(callBack: (arg0: T, arg1: number, arg2: MyArray<T>) => void, thisArg?: any): void;
  map<U>(callback: (arg0: T, arg1: number, arg2: MyArray<T>) => U, thisArg?: any): MyArray<U>;
  toString():string;
  filter(callback: (item: T, index: number, array: IMyArray<T>) => any, thisArg?: any): IMyArray<T>;
  find(callback: (arg0: T, arg1: number, arg2: MyArray<T>) => boolean, thisArg?: any): T;
};

class MyArray<T> implements IMyArray<T> {
  length: number;
  [index: number]: T;

  constructor(...rest: T[]|number[]) {
    if (rest.length === 1 && rest[0] < 0) {
      throw new RangeError('Invalid length of array');
    } else if (rest.length === 1 && typeof rest[0] === 'number') {
      this.length = rest[0] as number;
    } else {
      this.length = rest.length;

      for (let i = 0; i < this.length; i++) {
        this[i] = <T>rest[i];
      }
    }
  }


  static from<T>(arrayLike: ArrayLike<T>): MyArray<T>;
  static from<T, U>(arrayLike: ArrayLike<T>, callback?: { call: (arg0: ArrayLike<T>, arg1: T, arg2: number, arg3: ArrayLike<T>) => U; }, thisArg?: any):MyArray<U>

  static from<T, U>(arrayLike: ArrayLike<T>, callback?: { call: (arg0: ArrayLike<T>, arg1: T, arg2: number, arg3: ArrayLike<T>) => U; }, thisArg?: any):MyArray<U> {
    let newArray = new MyArray<any>();
    const context = thisArg || arrayLike;

    if (callback) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArray[i] = callback.call(context, arrayLike[i], i, arrayLike);
        newArray.length += 1;
      }
    }
    else {
      for (let i = 0; i < arrayLike.length; i++) {
        newArray[i] = arrayLike[i];
        newArray.length += 1;
      }
    }

    return newArray;
  }

  push(...rest:T[]):number {
    for (let i:number = 0; i < rest.length; i++) {
      this[this.length] = rest[i];
      this.length = this.length + 1;
    }

    return this.length;
  }

  pop(): T {
    const index:number = this.length - 1;
    const element:T = this[index];

    delete this[index];
    this.length > 0 ? this.length -= 1 : this.length = 0;

    return element;
  }

  forEach(callBack: (arg0: T, arg1: number, arg2: MyArray<T>) => void, thisArg?: any): void {
    const context = thisArg || this;

    for (let i = 0; i < this.length; i++) {
      callBack.call(context, this[i], i, this);
    }
  }
  
  map<U>(callback: (arg0: T, arg1: number, arg2: MyArray<T>) => U, thisArg?: any): MyArray<U>{
    const newArray = new MyArray<U>();

    if (!callback && typeof callback !== 'function') {
      const message:string = `${callback} is not a function at MyArray.map`;
      throw new TypeError(message);
    } else {
      for (let i:number = 0; i < this.length; i++) {
        newArray[i] = callback.call(thisArg, this[i], i, this);
        newArray.length += 1;
      }
    }

    return newArray;
  }

  reduce<U>(callback: (arg0: U, arg1: T, arg2: number, arg3: MyArray<T>) => U, initialValue?: U): U {
    if (!callback || typeof callback !== 'function') {
      const message = `${callback} is not a function at MyArray.reduce`;
      throw new TypeError(message);
    }

    if (this.length === 0 && !initialValue) {
      throw new TypeError('Method reduce called on null or undefined');
    }

    let accumulator = initialValue !== undefined ? initialValue : this[0];

    for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
      accumulator = callback(accumulator as U, this[i], i, this);
    }

    return accumulator as U;
  }

  filter(callback: (item: T, index: number, array: IMyArray<T>) => any, thisArg?: any): MyArray<T> {
    const newObj = new MyArray<T>();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        newObj[newObj.length] = this[i];
        newObj.length += 1;
      }
    }

    return newObj;
  }

  toString():string {
    let newStr:string = '';

    for (let i = 0; i < this.length - 1; i++) {
      newStr += `${this[i]},`;
    }

    newStr += this[this.length - 1];

    return this.length === 0 ? '' : newStr;
  }

  sort(callback: (arg0: T, arg1: T) => number):MyArray<T> {
    let cb = callback;

    if (!cb) {
      cb = (a, b) => {
        const a1:string = String(a);
        const b1:string = String(b);

        if (a1 > b1) {
          return 1;
        } else if (b1 > a1) {
          return -1;
        } else {
          return 0;
        }
      };
    }

    for (let i = 0; i < this.length; i++) {
      const swapElem = this[i];
      let lastValue = i - 1;

      while (lastValue >= 0 && cb(this[lastValue], swapElem) > 0) {
        this[lastValue + 1] = this[lastValue];
        lastValue -= 1;
      }
      this[lastValue + 1] = swapElem;
    }

    return this;
  }

  find(callback: (arg0: T, arg1: number, arg2: MyArray<T>) => boolean, thisArg?: any): any {    
    if (typeof (callback) !== 'function') {
      throw new TypeError('Callback is not a function.');
    }

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  slice(begin:number, end:number) {
    const newArray = new MyArray<T>();
    let beginValue = begin || 0;
    let endValue = end && Math.abs(end) < this.length ? end : this.length;

    if (beginValue < 0) {
      beginValue = this.length + begin;
    }

    if (endValue < 0) {
      endValue = this.length + end;
    }

    for (let i = beginValue; i < endValue; i++) {
      newArray[newArray.length] = this[i];
      newArray.length += 1;
    }

    return newArray;
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;
