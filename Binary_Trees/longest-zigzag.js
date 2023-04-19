/**
 * You are given the root of a binary tree.

A ZigZag path for a binary tree is defined as follow:

Choose any node in the binary tree and a direction (right or left).
If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
Change the direction from right to left or from left to right.
Repeat the second and third steps until you can't move in the tree.
Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

Return the longest ZigZag path contained in that tree.
 */

// O(n) time | O(h) space
const longestZigZag = (root) => {
  // left direction = 0, right direction = 1, start direction -1
  return dfs(root, -1, -1);
};

const dfs = (root, parentDirection, length) => {
  // base case  if root is null return length
  if (!root) return length;
  // recursively call dfs on both sides, passing in correct direction and updated length
  const left = dfs(root.left, 0, parentDirection === 0 ? 0 : length + 1);
  const right = dfs(root.right, 1, parentDirection === 1 ? 0 : length + 1);
  // return max
  return Math.max(left, right);
};
