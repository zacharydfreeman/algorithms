/* 
Given the root of a binary tree, return the length of the longest path, where each node in the path has the same value. This path may or may not pass through the root.

The length of the path between two nodes is represented by the number of edges between them.

Input: root = [5,4,5,1,1,null,5]
Output: 2
Explanation: The shown image shows that the longest path of the same value (i.e. 5).

Input: root = [1,4,5,4,4,null,5]
Output: 2
Explanation: The shown image shows that the longest path of the same value (i.e. 4).

*/

// O(n) time | O(h) space
const longestUnivaluePath = (root) => {
  return dfs(root)[1];
};

const dfs = (root) => {
  if (!root) return [0, 0]; // current height, max path
  let leftPath = 0;
  let rightPath = 0;
  let [leftHeight, leftMax] = dfs(root.left, root.val);
  let [rightHeight, rightMax] = dfs(root.right, root.val);

  if (root.left && root.val === root.left.val) {
    leftPath += leftHeight + 1;
  }
  if (root.right && root.val === root.right.val) {
    rightPath += rightHeight + 1;
  }
  // new max height
  const newHeight = Math.max(leftPath, rightPath);
  const newMax = Math.max(leftMax, rightMax, leftPath + rightPath);
  return [newHeight, newMax];
};
