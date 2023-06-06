/* 
Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]

Input: head = [2,1], x = 2
Output: [1,2]

*/

// O(n) time | O(1) space
const partition = (head, x) => {
  if (!head) return null;
  const lower = new ListNode(0);
  const upper = new ListNode(0);
  let p1 = lower;
  let p2 = upper;
  let current = head;
  while (current) {
    if (current.val < x) {
      p1.next = current;
      p1 = current;
    } else {
      p2.next = current;
      p2 = current;
    }
    current = current.next;
  }
  p2.next = null;
  p1.next = upper.next;
  return lower.next;
};
