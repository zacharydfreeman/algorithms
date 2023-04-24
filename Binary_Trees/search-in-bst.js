/*
You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

Input: root = [4,2,7,1,3], val = 5
Output: []
*/

// O(log(n)) time | O(1) space
const searchBST = (root, val) => {
  // declare current pointer
  let current = root;
  while (current) {
    // if current.val = val return current
    if (current.val === val) return current;
    if (current.val < val) {
      // go right
      current = current.right;
    } else {
      current = current.left;
    }
  }
  return null;
};
