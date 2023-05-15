/*
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.

A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22


*/

// O(n^2) time | O(n) space where n is the number of nodes
const pathSum = (root, targetSum) => {
  const paths = [];
  const dfs = (root, targetSum, path) => {
    if (!root) return;
    if (!root.left && !root.right && targetSum - root.val === 0) {
      paths.push([...path, root.val]);
      return;
    }
    const leftPath = [...path, root.val];
    const rightPath = [...path, root.val];
    dfs(root.left, targetSum - root.val, leftPath);
    dfs(root.right, targetSum - root.val, rightPath);
    return;
  };
  dfs(root, targetSum, []);
  return paths;
};
