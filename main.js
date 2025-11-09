class HashMap {
  constructor() {
    this.load = 0.75; // # to determine when to grow buckets array
    this.capacity = 16; // total # of buckets
    this.buckets = new Array(this.capacity)
  }

  hash(key) {
    let hashCode = 0;
    let index = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      index = hashCode % this.capacity
    }

    return {hashCode, index};
  }
}

const test = new HashMap()
console.log(test)
console.log(test.buckets)
console.log(test.hash("why"))