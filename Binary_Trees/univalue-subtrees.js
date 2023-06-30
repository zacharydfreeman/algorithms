/* 
Given the root of a binary tree, return the number of uni-value 
subtrees
.

A uni-value subtree means all nodes of the subtree have the same value.

Input: root = [5,1,5,5,5,null,5]
Output: 4

Input: root = []
Output: 0

Input: root = [5,5,5,5,5,null,5]
Output: 6

*/

// O(n) time | O(h) space
const countUnivalSubtrees = (root) => {
  let count = 0;
  const dfs = (root) => {
    if (!root) return [true, null];
    const [leftBool, leftVal] = dfs(root.left);
    const [rightBool, rightVal] = dfs(root.right);

    if (!leftBool || !rightBool) return [false, Infinity];

    if (
      (leftVal === null || root.val === leftVal) &&
      (rightVal === null || root.val === rightVal)
    ) {
      count++;
      return [true, root.val];
    }

    return [false, Infinity];
  };
  dfs(root);
  return count;
};
