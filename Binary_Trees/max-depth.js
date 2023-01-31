// Return max depth of a binary tree

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// Approach: Recursive
// O(n) time | O(h) space where n is number of nodes and h is height of tree
const maxDepth = (root) => {
  // base case if root is null return 0
  if (root === null) return 0;
  // return 1 + max of left and right height
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
