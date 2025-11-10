class HashMap {
  constructor() {
    this.load = 0.75; // # to determine when to grow buckets array
    this.capacity = 16; // total # of buckets
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    let index = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      index = hashCode % this.capacity;
    }

    return { hashCode, index };
  }

  set(key, value) {
    // set value at array index
    this.buckets[this.hash(key).index] = [key, value];

    // loop and check if number of undefined items in array is greater than capacity
    // if it is, double the capacity
    let count = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        count++;
        if (count > this.load * this.capacity) {
          this.buckets.length = this.capacity * 2;
        }
      }
    }
  }

  get(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != undefined && this.buckets[i][0] == key) {
        return this.buckets[i][1];
      }
    }
    return null;
  }
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown'); //
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple'); //
test.set('hat', 'black'); //
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden'); //
console.log(test.get('apple'));
console.log(test.get('ice cream'));
console.log(test.get('alligator'));

// console.log(test.buckets)
