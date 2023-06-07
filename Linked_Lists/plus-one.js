/*
Given a non-negative integer represented as a linked list of digits, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list.




*/

// O(n) time | O(1) space
const plusOne = (head) => {
  // reverse list
  const newHead = reverse(head);
  let current = newHead;
  let prev = null;
  let carry = 1;
  while (current) {
    const val = current.val + carry;
    if (val >= 10) {
      current.val = 0;
    } else {
      current.val = val;
    }
    carry = val >= 10 ? 1 : 0;
    prev = current;
    current = current.next;
  }
  if (carry) {
    const node = new ListNode(1);
    prev.next = node;
  }
  return reverse(newHead);
};

const reverse = (head) => {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
};
