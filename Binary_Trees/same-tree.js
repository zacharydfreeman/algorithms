/*
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical,
and the nodes have the same value.

*/

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// O(n) time | O(h) space where n is min number of nodes between both trees and h is min height b/w trees
const isSameTree = (p, q) => {
  // if both trees are null then return true
  if (p === null && q === null) return true;
  // if one of them is false return false
  if (p === null || q === null) return false;
  // if values do not equal return false
  if (p.val !== q.val) return false;

  // check if left is same
  const isLeftSame = isSameTree(p.left, q.left);
  // check if right is same
  const isRightSame = isSameTree(p.right, q.right);

  return isLeftSame && isRightSame;
};
