/*
Given the head of a linked list, remove the nth node from the end of the list and return its head.
 */

// Approach: One pass with two pointers
// O(n) time | O(1) space
const removeNthFromEnd = (head, n) => {
  let count = 1;
  let current1 = head;
  let current2 = head;

  while (count <= n) {
    count++;
    current2 = current2.next;
  }
  // if current2 is null then we must remove head
  if (!current2) {
    head = head.next;
    return head;
  }
  // traverse until current 2 is at second from end of list
  while (current2.next !== null) {
    current1 = current1.next;
    current2 = current2.next;
  }
  // update list
  current1.next = current1.next.next;
  return head;
};

// Approach: Two passes. First find the length and then remove
// O(n) time | O(1) space
const removeNthFromEnd2 = (head, n) => {
  if (!head) return head;
  // get length
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  let counter = 0;
  let prev = null;
  current = head;
  while (current) {
    if (counter === length - n) {
      // check if it head
      if (!prev) {
        head = head.next;
        break;
      }

      prev.next = current.next;
      break;
    }
    counter++;
    prev = current;
    current = current.next;
  }

  return head;
};
