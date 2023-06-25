/*
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.

Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]

Input: root = [1]
Output: ["1"]

*/

// Approach: Backtracking
// O(n) time | O(n) space
const binaryTreePaths = (root) => {
  const paths = [];
  const dfs = (root, path) => {
    if (!root) return;
    if (!root.left && !root.right) {
      paths.push([...path, root.val]);
      return;
    }
    path.push(root.val);
    dfs(root.left, path);
    dfs(root.right, path);
    // backtrack
    path.pop();
  };
  dfs(root, []);
  return paths.map((path) => path.join('->'));
};
