/* 
Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.
*/

// Approach: Dummy node
// O(n) time | O(1) space
const reverseBetween = (head, left, right) => {
  const dummyNode = new ListNode(0);
  dummyNode.next = head;
  let leftPrev = dummyNode;
  let current = head;
  // find the left pointer node
  let count = 1;
  while (count !== left) {
    leftPrev = current;
    current = current.next;
    count++;
  }
  // now our current pointer is at the left node, so we want to iterate
  let prev = null;
  while (count !== right + 1) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
    count++;
  }
  // update pointers
  leftPrev.next.next = current;
  leftPrev.next = prev;

  return dummyNode.next;
};
