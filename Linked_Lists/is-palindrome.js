/*
Given head of linked list, determine if it is a palindrome.

Do in O(n) time | O(1) space

a -> b -> c -> c -> b -> a
a <- b <- c   c -> b -> a
1 -> 0 -> 1
     s    f
 */

// Approach: Reverse the second half of the linked list and determine if palindrome
// O(n) time | O(1) space
const isPalindrome = (head) => {
  // get the middle of the linked list
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // reverse second half
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // traverse at each pointer and check if values are equal
  let current1 = head;
  let current2 = prev;
  while (current2) {
    if (current1.val !== current2.val) return false;
    current1 = current1.next;
    current2 = current2.next;
  }

  return true;
};

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
