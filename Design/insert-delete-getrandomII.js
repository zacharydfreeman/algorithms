/* 
RandomizedCollection is a data structure that contains a collection of numbers, possibly duplicates (i.e., a multiset). It should support inserting and removing specific elements and also reporting a random element.

Implement the RandomizedCollection class:

RandomizedCollection() Initializes the empty RandomizedCollection object.
bool insert(int val) Inserts an item val into the multiset, even if the item is already present. Returns true if the item is not present, false otherwise.
bool remove(int val) Removes an item val from the multiset if present. Returns true if the item is present, false otherwise. Note that if val has multiple occurrences in the multiset, we only remove one of them.
int getRandom() Returns a random element from the current multiset of elements. The probability of each element being returned is linearly related to the number of the same values the multiset contains.
You must implement the functions of the class such that each function works on average O(1) time complexity.

Note: The test cases are generated such that getRandom will only be called if there is at least one item in the RandomizedCollection.



*/

class RandomizedCollection {
  constructor() {
    this.numbersMap = {};
    this.numbers = [];
  }

  insert(val) {
    if (val in this.numbersMap) {
      this.numbersMap[val].push(this.numbers.length);
      this.numbers.push(val);
      return false;
    }
    this.numbersMap[val] = [this.numbers.length];
    this.numbers.push(val);
    return true;
  }

  remove(val) {
    if (!(val in this.numbersMap)) return false;
    const lastVal = this.numbers[this.numbers.length - 1];
    const idx = this.numbersMap[val].pop();
    this.numbers[idx] = lastVal;
    this.numbersMap[lastVal].push(idx);
    // remove the old last index from lastVal array
    const newIdxs = [];
    for (let idx of this.numbersMap[lastVal]) {
      if (idx === this.numbers.length - 1) continue;
      newIdxs.push(idx);
    }
    this.numbersMap[lastVal] = newIdxs;
    this.numbers.pop();
    if (this.numbersMap[val].length === 0) delete this.numbersMap[val];
    return true;
  }

  getRandom() {
    const randomNum = Math.floor(Math.random() * this.numbers.length);
    return this.numbers[randomNum];
  }
}
