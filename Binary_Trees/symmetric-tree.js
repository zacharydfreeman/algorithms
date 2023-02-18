/*
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
*/

// Approach: Recursive helper functions that checks for equality at each node
// O(n) time | O(h) space where n is number of nodes and h is height of tree
const isSymmetric = (root) => {
  return _isSymmetric(root.left, root.right);
};

const _isSymmetric = (left, right) => {
  // base cases: if both are null return true, if not, if either are null or vals dont equal return false
  if (!left && !right) return true;
  if (!left || !right || left.val !== right.val) return false;
  // recursively call and return function comparing left.left & right.right && left.right & right.left
  return (
    _isSymmetric(left.left, right.right) && _isSymmetric(left.right, right.left)
  );
};
