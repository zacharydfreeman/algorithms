/*
Given the root of a binary tree, invert the tree, and return its root.
*/

// Approach: Recursion
// O(n) time | O(h) space where h is the height of the tree
const invertTree = (tree) => {
  // base case is if tree is null return null
  if (!tree) return null;
  // save left and right tree
  const right = tree.right;
  const left = tree.left;
  // update tree's left and right nodes
  tree.left = right;
  tree.right = left;
  // recursively call function on both subtrees
  invertTree(tree.left);
  invertTree(tree.right);
  // return root
  return tree;
};
