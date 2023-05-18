/* 
Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.

Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.

Input: root = [1]
Output: 1
Explanation: Root is considered as good.
*/

// O(n) time | O(h) space
const goodNodes = (root) => {
  let count = 0;
  const dfs = (root, maxVal) => {
    if (!root) return;
    if (root.val >= maxVal) count++;
    const nextVal = root.val >= maxVal ? root.val : maxVal;
    dfs(root.left, nextVal);
    dfs(root.right, nextVal);
  };
  dfs(root, -Infinity);
  return count;
};
