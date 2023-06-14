/* 
Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

Input: root = [4,2,6,1,3]
Output: 1

Input: root = [1,0,48,null,null,12,49]
Output: 1

*/

// O(n) time | O(h) space
const getMinimumDifference = (root) => {
  let min = Infinity;
  let prevNode = null;

  const dfs = (root) => {
    if (!root) return;
    dfs(root.left);
    if (prevNode) {
      min = Math.min(min, root.val - prevNode.val);
    }
    prevNode = root;
    dfs(root.right);
  };
  dfs(root);
  return min;
};

// Approach: Inorder traversal
// O(n) time | O(n) space
const getMinimumDifference2 = (root) => {
  const values = [];
  inOrder(root, values);
  let min = Infinity;
  for (let i = 1; i < values.length; i++) {
    min = Math.min(min, values[i] - values[i - 1]);
  }
  return min;
};

const inOrder = (root, values) => {
  if (!root) return;
  inOrder(root.left, values);
  values.push(root.val);
  inOrder(root.right, values);
};
