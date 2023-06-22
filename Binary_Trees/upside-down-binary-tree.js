/*
Given the root of a binary tree, turn the tree upside down and return the new root.

You can turn a binary tree upside down with the following steps:

The original left child becomes the new root.
The original root becomes the new right child.
The original right child becomes the new left child.

Input: root = [1,2,3,4,5]
Output: [4,5,2,null,null,3,1]

Input: root = []
Output: []

*/

// O(n) time | O(h) space
const upsideDownBinaryTree = (root) => {
  if (!root) return root;

  return rotate(root);
};

const rotate = (root) => {
  // if no left node return
  if (!root.left) return root;
  // get root. Root will be recursive call to left subtree
  const newRoot = rotate(root.left);
  root.left.right = root;
  root.left.left = root.right;
  root.left = null;
  root.right = null;
  return newRoot;
};
