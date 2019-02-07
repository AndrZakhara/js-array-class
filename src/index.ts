interface IMyArray<T> {
  length:number;
  [index: number]: T;
  forEach(callBack: { call: (arg0: MyArray<T>, arg1: T, arg2: number, arg3: MyArray<T>) => void; }, thisArg?: MyArray<T>):void;
  slice(begin:number, end:number):MyArray<T>;
  map<TU>(callback: { call: (arg0: MyArray<T>, arg1: T, arg2: number, arg3: MyArray<T>) => TU; }, thisArg?:MyArray<T>):MyArray<TU>
  reduce(callback: (arg0: T, arg1: T, arg2: number, arg3: MyArray<T>) => T, initialValue: T): T;
  pop():T;
  push(...rest:T[]):number;
};

interface FilterFunction<T> extends CallableFunction {
(arg1: T, arg2: number, arg3: MyArray<T>): boolean;
}

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

  static from<T>(arrayLike: T[], callback: { call: (arg0: T[], arg1: T, arg2: number, arg3: T[]) => any; }, thisArg: T[]) {
    const newArray = new MyArray<T>();
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

  push(...rest:T[]):number { // надо проверить
    for (let i:number = 0; i < rest.length; i++) {
      this[this.length] = rest[i];
      this.length = this.length + 1;
    }

    return this.length;
  }

  pop():T {
    const index:number = this.length - 1;
    const element:T = this[index];

    delete this[index];
    this.length > 0 ? this.length -= 1 : this.length = 0;

    return element;
  }

  forEach(callBack: { call: (arg0: MyArray<T>, arg1: T, arg2: number, arg3: MyArray<T>) => void; }, thisArg?: this):void {
    const context = thisArg || this;

    for (let i = 0; i < this.length; i++) {
      callBack.call(context, this[i], i, this);
    }
  }

  map<TU>(callback: { call: (arg0: MyArray<T>, arg1: T, arg2: number, arg3: MyArray<T>) => TU; }, thisArg = this):MyArray<TU> {
    const newArray = new MyArray<TU>();

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

  reduce(callback: (arg0: T, arg1: T, arg2: number, arg3: MyArray<T>) => T, initialValue: T): T {
    if (!callback || typeof callback !== 'function') {
      const message = `${callback} is not a function at MyArray.reduce`;
      throw new TypeError(message);
    }

    if (this.length === 0 && !initialValue) {
      throw new TypeError('Method reduce called on null or undefined');
    }

    let accumulator = initialValue !== undefined ? initialValue : this[0];

    for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  filter(callback: FilterFunction<T>, thisArg = this) {
    const resultArr = new MyArray<T>();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        resultArr[resultArr.length] = this[i];
        resultArr.length += 1;
      }
    }
    return resultArr;
  }

  toString():string {
    let newStr:string = '';

    for (let i = 0; i < this.length - 1; i++) {
      newStr += `${this[i]},`;
    }

    newStr += this[this.length - 1];

    return this.length === 0 ? '' : newStr;
  }

  sort(callback: (arg0: T, arg1: T) => number) {
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

  find(callback: { call: (arg0: MyArray<T>, arg1: T, arg2: number, arg3: MyArray<T>) => T }, thisArg: MyArray<T>) {
    let elemFind = null;

    for (let i = 0; i < this.length; i++) {
      elemFind = this[i];

      if (callback.call(thisArg, this[i], i, this)) {
        return elemFind;
      }
    }
  }

  slice(begin:number, end:number) { // сделано
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