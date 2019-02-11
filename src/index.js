/* eslint-disable*/
;
class MyArray {
    constructor(...rest) {
        if (rest.length === 1 && rest[0] < 0) {
            throw new RangeError('Invalid length of array');
        }
        else if (rest.length === 1 && typeof rest[0] === 'number') {
            this.length = rest[0];
        }
        else {
            this.length = rest.length;
            for (let i = 0; i < this.length; i++) {
                this[i] = rest[i];
            }
        }
    }
    static from(arrayLike, callback, thisArg) {
        let newArray = new MyArray();
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
        const context = thisArg || this;
        for (let i = 0; i < this.length; i++) {
            callBack.call(context, this[i], i, this);
        }
    }
    map(callback, thisArg) {
        const newArray = new MyArray();
        if (!callback && typeof callback !== 'function') {
            const message = `${callback} is not a function at MyArray.map`;
            throw new TypeError(message);
        }
        else {
            for (let i = 0; i < this.length; i++) {
                newArray[i] = callback.call(thisArg, this[i], i, this);
                newArray.length += 1;
            }
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
        let accumulator = initialValue !== undefined ? initialValue : this[0];
        for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
            accumulator = callback(accumulator, this[i], i, this);
        }
        return accumulator;
    }
    filter(callback, thisArg) {
        const newObj = new MyArray();
        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                newObj[newObj.length] = this[i];
                newObj.length += 1;
            }
        }
        return newObj;
    }
    toString() {
        let newStr = '';
        for (let i = 0; i < this.length - 1; i++) {
            newStr += `${this[i]},`;
        }
        newStr += this[this.length - 1];
        return this.length === 0 ? '' : newStr;
    }
    sort(callback) {
        let cb = callback;
        if (!cb) {
            cb = (a, b) => {
                const a1 = String(a);
                const b1 = String(b);
                if (a1 > b1) {
                    return 1;
                }
                else if (b1 > a1) {
                    return -1;
                }
                else {
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
    find(callback, thisArg) {
        if (typeof (callback) !== 'function') {
            throw new TypeError('Callback is not a function.');
        }
        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
    }
    slice(begin, end) {
        const newArray = new MyArray();
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
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    }
}
export default MyArray;
