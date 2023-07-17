/* 
Design a map that allows you to do the following:

Maps a string key to a given value.
Returns the sum of the values that have a key with a prefix equal to a given string.
Implement the MapSum class:

MapSum() Initializes the MapSum object.
void insert(String key, int val) Inserts the key-val pair into the map. If the key already existed, the original key-value pair will be overridden to the new one.
int sum(string prefix) Returns the sum of all the pairs' value whose key starts with the prefix.

Input
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output
[null, null, 3, null, 5]

Explanation
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)


*/

class MapSum {
  constructor() {
    this.map = {};
    this.root = { score: 0 };
  }

  insert(key, val) {
    const delta = key in this.map ? val - this.map[key] : val;
    let current = this.root;
    current.score += delta;
    for (let char of key) {
      if (!(char in current)) current[char] = { score: 0 };
      current[char].score += delta;
      current = current[char];
    }
    this.map[key] = val;
  }

  sum(prefix) {
    let current = this.root;
    for (let char of prefix) {
      if (!(char in current)) return 0;
      current = current[char];
    }
    return current.score;
  }
}

class MapSum2 {
  constructor() {
    this.map = {};
  }

  insert(key, val) {
    this.map[key] = val;
  }

  sum(prefix) {
    let sum = 0;
    for (let string in this.map) {
      if (string.startsWith(prefix)) sum += this.map[string];
    }
    return sum;
  }
}
