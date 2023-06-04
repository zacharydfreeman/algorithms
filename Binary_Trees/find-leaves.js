/*
Given the root of a binary tree, collect a tree's nodes as if you were doing this:

Collect all the leaf nodes.
Remove all the leaf nodes.
Repeat until the tree is empty.

Input: root = [1,2,3,4,5]
Output: [[4,5,3],[2],[1]]
Explanation:
[[3,5,4],[2],[1]] and [[3,4,5],[2],[1]] are also considered correct answers since per each level it does not matter the order on which elements are returned.

Input: root = [1]
Output: [[1]]

*/

// Approach: DFS
// O(n) time | O(n) space
const findLeaves = (root) => {
  const output = [];
  const dfs = (root) => {
    if (!root) return -1;
    const leftHeight = dfs(root.left);
    const rightHeight = dfs(root.right);
    const newHeight = 1 + Math.max(leftHeight, rightHeight);
    // if output size = newHeight add an empty array
    if (output.length === newHeight) output.push([]);
    // add the root to this level
    output[newHeight].push(root.val);
    // return newHeight
    return newHeight;
  };
  dfs(root);
  return output;
};
