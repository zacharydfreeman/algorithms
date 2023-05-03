/*
Design a HashSet without using any built-in hash table libraries.

Implement MyHashSet class:

void add(key) Inserts the value key into the HashSet.
bool contains(key) Returns whether the value key exists in the HashSet or not.
void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.

Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)

*/

class MyHashSet {
  constructor() {
    this.set = new Array(2).fill(null);
    this.capacity = this.set.length;
    this.size = 0;
  }

  // open addressing -> if a spot is taken, go to the next available one
  add(key) {
    // get hashed key
    let index = this.hash(key);
    while (this.set[index] !== key) {
      if (this.set[index] === null) {
        // add the key
        this.set[index] = key;
        this.size++;
        // check to see if you need to double array
        if (this.size / this.capacity >= 0.5) {
          this.rehash();
        }
        return;
      }
      // increment and mod index
      index++;
      index = index % this.capacity;
    }
  }

  remove(key) {
    let index = this.hash(key);
    // have to find the key if in set
    while (this.set[index] !== null) {
      if (this.set[index] === key) {
        this.set[index] = null;
        this.size--;
        return;
      }
      index++;
      index = index % this.capacity;
    }
  }
  contains(key) {
    for (let num of this.set) {
      if (num !== null && num === key) return true;
    }
    return false;
  }

  hash(key) {
    return key % this.capacity;
  }

  rehash() {
    // update capacity
    this.capacity = this.capacity * 2;
    const oldSet = this.set;
    const newSet = new Array(this.capacity).fill(null);
    this.set = newSet;
    this.size = 0;
    for (let i = 0; i < oldSet.length; i++) {
      if (oldSet[i] !== null) {
        this.add(oldSet[i]);
      }
    }
  }
}
