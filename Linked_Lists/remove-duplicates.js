/**
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.
 * 
 * Input: head = [1,1,2]
Output: [1,2]

Input: head = [1,1,2,3,3]
Output: [1,2,3]
 */

// O(n) time | O(1) space where n is the number of nodes
const deleteDuplicates = (head) => {
  let prev = null;
  let current = head;
  while (current) {
    if (prev) {
      while (current && current.val === prev.val) {
        current = current.next;
      }
      prev.next = current;
    }
    prev = current;
    current = !current ? null : current.next;
  }
  return head;
};
