/**
 * Design HashMap
 */

class MyHashMap {
  constructor() {
    this.map = new Array(1000).fill(new Node(-1, -1));
    this.size = 0;
  }

  put(key, value) {
    const index = this.hash(key);
    let current = this.map[index];
    while (current.next) {
      if (current.next.key === key) {
        // update value
        current.next.val = value;
        return;
      }
      current = current.next;
    }
    // if you make it to end of LL, then the key wasnt in list
    current.next = new Node(key, value);
  }

  get(key) {
    const index = this.hash(key);
    let current = this.map[index];
    while (current) {
      if (current.key === key) return current.val;
      current = current.next;
    }
    return -1;
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.map[index];
    let prev = null;
    while (current) {
      if (current.key === key) {
        prev.next = current.next;
        return;
      }
      prev = current;
      current = current.next;
    }
  }

  hash(key) {
    return key % this.map.length;
  }
}

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
  }
}
