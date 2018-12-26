class MyArray {
  constructor(...rest) {
    rest !== undefined ? this.length = rest.length : this.length = 0;

    if (rest.length === 1 && typeof rest[0] === 'number') {
      this.length = rest[0];
    } else if (rest.length === 1 && rest[0] < 0) {
      throw new RangeError('Invalid length of array');
    }

    for (let i = 0; i < this.length; i++) {
      this[i] = rest[i];
    }
  }

  static from(arrayLike, callback, thisArg) {
    let context = null;
    const newArray = new MyArray();

    thisArg === undefined ? context = arrayLike : context = thisArg;

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

  push(...rest) {
    for (let i = 0; i < rest.length; i++) {
      this[this.length] = rest[i];
      this.length = this.length + 1;
    }

    return this.length;
  }

  pop() {
    const index = this.length - 1;
    const element = this[index];

    delete this[index];
    this.length > 0 ? this.length -= 1 : this.length = 0;

    return element;
  }

  forEach(callBack, thisArg) {
    const context = thisArg ? thisArg : this;

    for (let i = 0; i < this.length; i++) {
      callBack.call(context, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const newArray = new MyArray();
    const context = thisArg ? thisArg : this;

    if (callback && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        newArray[i] = callback.call(context, this[i], i, this);
        newArray.length += 1;
      }
    } else {
      const message = `${callback} is not a function at MyArray.map`;
      throw new TypeError(message);
    }

    return newArray;
  }

  reduce(callback, initialValue) {
    if (!callback || typeof callback !== 'function') {
      const message = `${callback} is not a function at MyArray.reduce`;
      throw new TypeError(message);
    }

    if (this.length === 0 && !initialValue) {
      throw new TypeError('Method reduce called on null or undefined');
    }

    if (this.length === 1 && !initialValue) {
      return this[0];
    }

    if (this.length === 0 && initialValue) {
      return initialValue;
    }

    let accumulator = typeof initialValue !== 'undefined' ? initialValue : this[0];
    let i = typeof initialValue !== 'undefined' ? 0 : 1;

    for (i; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  filter(callback, thisArg) {
    let context = null;
    const newArray = new MyArray();
    let boolean = null;
    let k = 0;

    thisArg === undefined ? context = this : context = thisArg;

    for (let i = 0; i < this.length; i++) {
      boolean = callback.call(context, this[i], i, this);

      if (boolean) {
        newArray[k] = this[i];
        k += 1;
        newArray.length += 1;
      }
    }

    return newArray;
  }

  toString() {
    let stringResult = '';
    const stringElement = ',';

    for (let i = 0; i < this.length; i++) {
      (i !== this.length - 1) ? stringResult += this[i] + stringElement : stringResult += this[i];
    }

    return stringResult;
  }

  sort(compareFunction) {
    if (compareFunction) {
      let element = null;

      for (let j = this.length; j > 1; j--) {
        for (let i = 0; i < this.length - 1; i++) {
          if (compareFunction(this[i], this[i + 1]) > 0) {
            element = this[i];
            this[i] = this[i + 1];
            this[i + 1] = element;
          }
        }
      }

      return this;
    }
    else {
      for (let i = 1; i < this.length; i++) {
        const currentElement = this[i];
        let j = i;

        while (j > 0 && String(this[j - 1]) > String(currentElement)) {
          this[j] = this[j - 1];
          j -= 1;
        }

        this[j] = currentElement;
      }

      return this;
    }
  }

  find(callback, thisArg) {
    const context = thisArg ? thisArg : this;
    const initialArray = context.map(i => i);

    if (callback && typeof callback === 'function') {
      for (let i = 0; i < initialArray.length; i++) {
        if (callback(initialArray[i], i, context)) {
          return initialArray[i];
        }
      }
    } else {
      const message = `${callback} is not a function at MyArray.map`;

      throw new TypeError(message);
    }

    return undefined;
  }

  slice(begin, end) {
    const newArray = new MyArray();
    let beginValue = begin ? begin : 0;
    let endValue = end && Math.abs(end) < this.length ? end : this.length;

    if (beginValue < 0) {
      beginValue = this.length + begin;
    }

    if (endValue < 0) {
      endValue = this.length + end;
    }

    for (let i = beginValue, k = 0; i < endValue; i++) {
      newArray[k] = this[i];
      k += 1;
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