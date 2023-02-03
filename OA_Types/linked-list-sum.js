/*
Given a singly linkedlist like:
1->4->3->2

You have to calculate the sum of first and last elements like:
1+2 = 3
4+3 = 7

Then output the maximum sum. Here maximum sum is 7.

Space complexity should be O(1).
No constraint on time complexity.
 */

// Approach: Reverse linked list from middle to end

const maxSum = (head) => {
  // find the middle of the linked list using two pointers
  let prev = null;
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  // make prev.next = null
  prev.next = null;
  // reverse linked list starting at slow
  let newPrev = null;
  let newCurrent = slow;
  while (newCurrent !== null) {
    const next = newCurrent.next;
    newCurrent.next = newPrev;
    newPrev = newCurrent;
    newCurrent = next;
  }

  // start at head and newPrev
  let max = -Infinity;
  let current1 = head;
  let current2 = newPrev;

  while (current1 && current2) {
    const sum = current1.value + current2.value;
    max = Math.max(max, sum);
    current1 = current1.next;
    current2 = current2.next;
  }

  return max;
};

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
