/*
Determine if linked list has cycle

3 -> 4 -> 5 -> 1 -> 7 -> 4
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space
const hasCycle = (head) => {
  // declare fast and slow pointers
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    // if slow === fast there is a cycle, return true
    if (slow === fast) return true;
  }
  return false;
};
