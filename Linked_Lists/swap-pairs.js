/*
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

Input: head = [1,2,3,4]
Output: [2,1,4,3]

Input: head = []
Output: []

Input: head = [1]
Output: [1]

*/

// O(n) time | O(1) space
const swapPairs = (head) => {
  if (!head || !head.next) return head;
  const dummyNode = new ListNode(0);
  let tail = dummyNode;
  let p1 = head;
  let p2 = head.next;
  while (p1 && p2) {
    // grab next of p2 to not lose reference
    const next = p2.next;
    // update node pointers
    p2.next = p1;
    p1.next = next;
    tail.next = p2;
    // update tail, p1, p2 pointers
    tail = p1;
    p1 = next;
    p2 = p1 === null ? null : p1.next;
  }
  return dummyNode.next;
};
