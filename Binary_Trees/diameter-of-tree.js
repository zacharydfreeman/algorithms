/**
 * Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

Input: root = [1,2]
Output: 1
 */

// Approach: DFS
// O(n) time | O(h) space where n is the number of nodes and h is the height of the tree
const diameterOfBinaryTree = (root) => {
  // call helper function
  return dfs(root).diameter;
};

const dfs = (root) => {
  if (!root) return { diameter: 0, height: 0 };
  // get left and right subtree info
  const leftTree = dfs(root.left);
  const rightTree = dfs(root.right);
  const maxDiameter = Math.max(
    leftTree.diameter,
    rightTree.diameter,
    leftTree.height + rightTree.height
  );
  const newHeight = 1 + Math.max(leftTree.height, rightTree.height);
  return { diameter: maxDiameter, height: newHeight };
};
