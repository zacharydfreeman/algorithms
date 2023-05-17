/* 
You are given the head of a linked list and two integers m and n.

Traverse the linked list and remove some nodes in the following way:

Start with the head as the current node.
Keep the first m nodes starting with the current node.
Remove the next n nodes
Keep repeating steps 2 and 3 until you reach the end of the list.
Return the head of the modified list after removing the mentioned nodes.

Input: head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3
Output: [1,2,6,7,11,12]
Explanation: Keep the first (m = 2) nodes starting from the head of the linked List  (1 ->2) show in black nodes.
Delete the next (n = 3) nodes (3 -> 4 -> 5) show in read nodes.
Continue with the same procedure until reaching the tail of the Linked List.
Head of the linked list after removing nodes is returned.

Input: head = [1,2,3,4,5,6,7,8,9,10,11], m = 1, n = 3
Output: [1,5,9]
Explanation: Head of linked list after removing nodes is returned.


*/

// O(n) time | O(1) space where n is the number of nodes
const deleteNodes = (head, m, n) => {
  if (!head) return head;
  let current = head;
  let count = 0;
  while (current) {
    count++;
    if (count === m) {
      // need to find next node;
      let nextNode = current.next;
      let step = 0;
      while (step !== n && nextNode) {
        step++;
        nextNode = nextNode.next;
      }
      count = 0;
      current.next = nextNode;
    }
    current = current.next;
  }
  return head;
};
