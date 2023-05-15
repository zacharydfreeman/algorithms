/* 
You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]

Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]

*/

// O(n) time | O(1) space
const swapNodes = (head, k) => {
  if (!head) return null;
  let length = 0;
  let firstNode;
  let current = head;
  while (current) {
    length++;
    if (length === k) firstNode = current;
    current = current.next;
  }
  let secondNode = head;
  let count = 0;
  while (count !== length - k) {
    count++;
    secondNode = secondNode.next;
  }
  const firstVal = firstNode.val;
  firstNode.val = secondNode.val;
  secondNode.val = firstVal;
  return head;
};
