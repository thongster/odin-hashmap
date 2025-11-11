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
    
    if (this.buckets[this.hash(key).index] === undefined) {
        this.buckets[this.hash(key).index] = [[key, value]];
    } else {
        this.buckets[this.hash(key).index].push([key, value])
    }

    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
        if (this.buckets[i]) {
            count++
            if (this.buckets[i][1]) {
                count++
            }
        }
    }

    // if count goes over load * capacity
    // rehash everything with new capacity
    if (count > this.load * this.capacity) {
        this.resize()
    }
  }

  resize() {
    this.capacity = this.capacity * 2; // double the capacity
    const oldBuckets = this.buckets // save old buckets to loop over later
    this.buckets = new Array(this.capacity) // create new array with new capacity

    // loop through old buckets
    for (const bucket of oldBuckets) {
        // if bucket exists (not undefined)
        if (bucket) {
            // loop through each key value pair
            for (const [key, value] of bucket) {
                // rehash everything
                if (this.buckets[this.hash(key).index] === undefined) {
                    this.buckets[this.hash(key).index] = [[key, value]];
                } else {
                    this.buckets[this.hash(key).index].push([key, value])
                }
            }
        }
    }
  }

  get(key) {
    // loop through this.buckets, and each entry if multiple entries in same bucket
    // if the hash exists and the key is the same, return value
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (const [entryKey, entryValue] of this.buckets[i]) {
            if (key == entryKey) {
                return entryValue
            }
        }
      }
    }
    // else return null
    return null;
  }

  has(key) {
    // loop through this.buckets, and each entry if multiple entries in same bucket
    // if the hash exists and the key is the same, return true
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (const [entryKey, entryValue] of this.buckets[i]) {
            if (key == entryKey) {
                return true
            }
        }
      }
    }
    return false;
  }

  remove(key) {
    // loop through and turn the key we are looking for into undefined
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (const [entryKey, entryValue] of this.buckets[i]) {
            if (key == entryKey) {
                this.buckets[i].splice([entryKey, entryValue], 1)
                return true
            }
        }
      }
    }

    return false;
  }

  length() {
    // loop through and increase count if the hash exists
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (const [entryKey, entryValue] of this.buckets[i]) {
            count++
        }
      }
    }
    return count;
  }

  clear() {
    // turn all into undefined
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = undefined;
    }
  }

  keys() {
    let keysArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != undefined) {
        keysArray.push(this.buckets[i][0]);
      }
    }
    return keysArray;
  }

  values() {
    let valuesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != undefined) {
        valuesArray.push(this.buckets[i][1]);
      }
    }
    return valuesArray;    
  }

  entries() {
    let entriesArray = []
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] != undefined) {
        entriesArray.push(this.buckets[i]);
      }
    }
    return entriesArray;    
  }
}



// console.log(test.length());
// console.log(test.clear())
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());
// console.log(test.buckets);
// console.log(test.buckets)

const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
// test.set('moon', 'silver')
console.log(test.get('apple'));
console.log(test.get('lion'));
console.log(test.get('alligator'));
console.log(test.has('frog'));
console.log(test.has('hat'));
console.log(test.has('eagle'));
// console.log(test.remove('frog'));
// console.log(test.remove('jacket'));
console.log(test.remove('dog'));
// console.log(test.remove('eagle'));
console.log(test.length())
console.log(test.buckets)