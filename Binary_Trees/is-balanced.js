/*
Given a binary tree, determine if it is height-balanced

Input: root = [3,9,20,null,null,15,7]
Output: true

Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

*/

// O(n) time | O(h) space where n is the number of nodes and h is the height of the tree
const isBalanced = (root) => {
  return getTreeInfo(root).isBalanced;
};

class TreeInfo {
  constructor(isBalanced, height) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}
const getTreeInfo = (root) => {
  // base case if root is null
  if (!root) return new TreeInfo(true, -1);
  // recursively call on left and right subtree
  const leftTreeInfo = getTreeInfo(root.left);
  const rightTreeInfo = getTreeInfo(root.right);
  const newHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);
  const isBalanced =
    leftTreeInfo.isBalanced &&
    rightTreeInfo.isBalanced &&
    Math.abs(leftTreeInfo.height - rightTreeInfo.height) <= 1;
  return new TreeInfo(isBalanced, newHeight);
};
