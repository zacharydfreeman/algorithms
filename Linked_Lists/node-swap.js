/*
Write a function that takes in the hea of a Singly Linked List,
swaps every pair of adjacent nodes in place

If the input has an odd number of nodes, its final node hsould remain the same

head = 0 -> 1 -> 2 -> 3 -> 4 -> 5
output = 1 -> 0 -> 3 -> 2 -> 5 -> 4
 */

class LinkedList {
  constructor(value) {
    this.value;
    this.next;
  }
}
// Approach: 3 pointers. Could do this with two, but three pointers are easier to follow
// O(n) time | O(1) space
const nodeSwap = (head) => {
  // determine new head
  const newHead = head.next === null ? head : head.next;
  // declare previous, current and next pointers
  let prevNode = null;
  let currentNode = head;
  let nextNode = currentNode.next;
  while (currentNode !== null && nextNode !== null) {
    // We are performing the swap
    // grab current.next.next
    const nextNextNode = nextNode.next;
    // next.next node is going to be current
    nextNode.next = currentNode;
    // current.next = nextNextNode
    currentNode.next = nextNextNode;
    // if previous is not null then we have to update what previous is pointing to after the pair swap
    if (prevNode !== null) {
      // prev.next is going to be nextNode
      prevNode.next = nextNode;
    }
    // update pointers
    prevNode = currentNode;
    currentNode = currentNode.next;
    nextNode = currentNode === null ? null : currentNode.next;
  }
  return newHead;
};

// Approach: Recursive
// O(n) time | O(n) space
const nodeSwap2 = (head) => {
  // base case if either head or head.next is null return the head
  if (head === null || head.next === null) return head;
  // grab the next node so you wont lose reference to it
  const nextNode = head.next;
  // set head.next to recursive call of the nextNode.next
  head.next = nodeSwap(nextNode.next);
  // set nextNode.next to head
  nextNode.next = head;
  // return nextNode
  return nextNode;
};

const add = (nums) => {};
