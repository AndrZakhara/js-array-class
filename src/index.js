class MyArray {
  constructor(...rest) {
    rest !== undefined ? this.length = rest.length : this.length = 0;

    if (rest.length === 1 && typeof rest[0] === 'number') {
      this.length = rest[0];
    } else if (rest.length === 1 && rest[0] < 0) {
      throw new RangeError('Invalid length of array');
    }

    for (let i = 0; i < this.length; i++) {
      this[i] = rest.length === 1 && typeof rest[0] === 'number' ? i : rest[i];
    }
  }

  static from(arrayLike, callback, thisArg = this) {
    const newArray = new MyArray();

    if (callback) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArray[i] = callback.call(thisArg, arrayLike[i], i, arrayLike);
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
    const element = this[this.length - 1];

    delete this[this.length - 1];
    this.length > 0 ? this.length -= 1 : this.length = 0;

    return element;
  }

  forEach(callBack, thisArg = this) {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      callBack.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg = this) {
    const newArray = new MyArray();

    if (callback && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        newArray[i] = callback.call(thisArg, this[i], i, this);
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

    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let i = initialValue !== undefined ? 0 : 1;
    const { length } = this;

    for (i; i < length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  filter(callback, thisArg = this) {
    const newArray = new MyArray();
    let boolean = null;
    let k = 0;
    const { length } = this;

    for (let i = 0; i < length; i++) {
      boolean = callback.call(thisArg, this[i], i, this);

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

  find(callback, thisArg = this) {
    const { length } = this;

    if (callback && typeof callback === 'function') {
      for (let i = 0; i < length; i++) {
        if (callback.call(thisArg, thisArg[i], i, thisArg)) {
          return thisArg[i];
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