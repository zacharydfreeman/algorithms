/* 
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

*/

// Approach: Dummy node and two pointers
// O(n) time | O(1) space
const reverseKGroup = (head, k) => {
  // declare dummy node and tail pointer
  const dummyNode = new ListNode(0);
  let tail = dummyNode;
  // declare two pointers that act as the bounds for the reversal and count variable
  let p1 = head;
  let p2 = head;
  let count = 0;
  while (p2) {
    // move p2 and update count
    p2 = p2.next;
    count++;
    // if count === k, we need to reverse
    if (count === k) {
      // set prev to p2
      let prev = p2;
      // save reference to p1 in order to update the tail appropriately later
      const nextTail = p1;
      // reverse logic
      while (p1 !== p2) {
        const next = p1.next;
        p1.next = prev;
        prev = p1;
        p1 = next;
      }
      // update tail
      tail.next = prev;
      tail = nextTail;
      // set count to 0
      count = 0;
    }
  }
  return dummyNode.next;
};
