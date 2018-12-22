class MyArray {
  constructor(...rest) {
    rest !== undefined ? this.length = rest.length : this.length = 0;

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
  }

  pop() {
    const index = this.length - 1;
    const element = this[index];

    delete this[index];
    this.length -= 1;

    return element;
  }

  forEach(callBack, thisArg) {
    let context = null;

    thisArg === undefined ? context = this : context = thisArg;

    for (let i = 0; i < this.length; i++) {
      this[i] = callBack.call(context, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    let context = null;
    const newArray = new MyArray();

    thisArg === undefined ? context = this : context = thisArg;
    callback.apply(context);

    for (let i = 0; i < this.length; i++) {
      newArray[i] = callback(this[i], i, this);
    }
    newArray.length = context.length;

    return newArray;
  }

  reduce(callback, initialValue) {
    let accumulator = null;
    let previousValue = null;

    initialValue !== undefined ? accumulator = initialValue : accumulator = 0;
    previousValue = accumulator;
    callback.apply(this);

    for (let i = 0; i < this.length; i++) {
      previousValue = callback(previousValue, this[i], i, this);
    }

    return previousValue;
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
}

export default MyArray;