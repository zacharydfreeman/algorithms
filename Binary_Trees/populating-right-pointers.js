/* 
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.


*/

// Approach: Level-Order Linked List Traversal
// O(n) time | O(1) space
const connect = (root) => {
  if (!root) return root;
  // declare left most pointer
  let leftMost = root;
  // while leftMost.left exists
  while (leftMost.left !== null) {
    // LL traversal -> head will be set to leftMost initially
    let head = leftMost;
    while (head) {
      // set head.left.next t0 head.right
      head.left.next = head.right;
      // if head.next exist, head.right.next = head.next.left
      if (head.next) head.right.next = head.next.left;
      // update head pointer
      head = head.next;
    }
    // update leftMost pointer
    leftMost = leftMost.left;
  }
  // return root
  return root;
};

// Approach: BFS
// O(n) time | O(n) space
const connect2 = (root) => {
  if (!root) return null;
  let queue = [root];
  while (queue.length) {
    let next = null;
    let nextLevel = [];
    for (let curr of queue) {
      // need to put right left
      curr.next = next;
      next = curr;
      if (curr.right) nextLevel.push(curr.right);
      if (curr.left) nextLevel.push(curr.left);
    }
    queue = nextLevel;
  }
  return root;
};
