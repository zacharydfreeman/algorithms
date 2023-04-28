/*
Given the head of a linked list, rotate the list to the right by k places.



 */

// O(n) time | O(1) space
const rotateRight = (head, k) => {
  if (!head) return null;
  // get length;
  const length = getLength(head);
  // mod k by length
  k = k % length;
  if (k === 0) return head;
  // get new head and track prev
  let prev = null;
  let current = head;
  let count = 0;
  let prevHead;
  let newHead;
  while (current) {
    if (count === length - k) {
      newHead = current;
      prevHead = prev;
    }
    count++;
    prev = current;
    current = current.next;
  }
  // update pointers
  // prev points to null
  prevHead.next = null;
  prev.next = head;

  return newHead;
};

const getLength = (head) => {
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }
  return length;
};
