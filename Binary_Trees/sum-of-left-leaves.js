/*
Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.

Input: root = [1]
Output: 0

*/
// O(n) time | O(h) space
const sumOfLeftLeaves = (root) => {
  let count = 0;
  const dfs = (root) => {
    if (!root) return;
    if (root.left && !root.left.left && !root.left.right)
      count += root.left.val;
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return count;
};
