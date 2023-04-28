/**
 * Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.
 * 
 * Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]

Input: head = [1,1,1,2,3]
Output: [2,3]
 */

// O(n) time | O(1) space
const deleteDuplicates = (head) => {
  const dummyNode = new ListNode(0, head);
  // last node before dupilicates
  let prev = dummyNode;
  let current = head;
  while (current) {
    // if beg, skip all duplicates
    if (current.next && current.next.val === current.val) {
      // move till the end of the duplicates
      while (current.next && current.next.val === current.val) {
        current = current.next;
      }
      // skip all duplicates
      prev.next = current.next;
      // you dont update the prev pointer becuase you could still have duplicates at where the prev pointer is currently pointing at
    } else {
      prev = prev.next;
    }
    // move current
    current = current.next;
  }
  return dummyNode.next;
};
