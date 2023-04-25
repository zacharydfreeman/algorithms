/*
Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

*/

// O(n) time | O(n) space
const buildTree = (
  preorder,
  inorder,
  i = 0,
  j = preorder.length - 1,
  k = 0,
  l = inorder.length - 1
) => {
  if (k > l) return null;
  // get the root node
  const val = preorder[i];
  const node = new TreeNode(val);
  // find the index of val in the inorder array
  const idx = inorder.indexOf(val);
  // determin left size
  const leftSize = idx - k;
  // recursively call function to get left subtree left
  node.left = buildTree(preorder, inorder, i + 1, i + leftSize, k, idx - 1);
  // recusrively call function to get right subtree
  node.right = buildTree(preorder, inorder, i + leftSize + 1, j, idx + 1, l);
  // return node
  return node;
};
