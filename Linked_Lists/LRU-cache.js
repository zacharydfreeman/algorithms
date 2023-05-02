/**
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 */
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.cache = {}; // will contain all nodes
    this.left = new Node(0);
    this.right = new Node(0);
    this.left.next = this.right; // will always point to least frequently used
    this.right.prev = this.left; // will always point to most frequently used
  }
  // O(1) time | O(1) space
  get(key) {
    if (!(key in this.cache)) return -1;
    // remove and then add back
    this.delete(this.cache[key]);
    this.insert(this.cache[key]);
    return this.cache[key].val;
  }
  // O(1) time | O(1) space
  put(key, value) {
    const node = new Node(key, value);
    if (key in this.cache) this.delete(this.cache[key]);
    this.cache[key] = node;
    this.insert(node);

    // check if you're at capacity
    if (this.size > this.capacity) {
      // delete lfu from cache and list
      const lfu = this.left.next;
      this.delete(lfu);
      delete this.cache[lfu.key];
    }
  }
  // O(1) time | O(1) space
  insert(node) {
    const prev = this.right.prev;
    prev.next = node;
    node.prev = prev;
    this.right.prev = node;
    node.next = this.right;
    this.size++;
  }
  // O(1) time | O(1) space
  delete(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
    this.size--;
  }
}
