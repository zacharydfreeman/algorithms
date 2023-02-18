/*
Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
 */

// O(n) time | O(n) space
const sortedArrayToBST = (nums, i = 0, j = nums.length - 1) => {
  // base case: if i > j return null
  if (i > j) return null;
  // get middle index and middle value that will become root node
  const midIdx = Math.floor((i + j) / 2);
  const rootVal = nums[midIdx];
  const rootNode = new TreeNode(rootVal);
  // set rootNode.left to be result of recursively calling function with updated indexes
  rootNode.left = sortedArrayToBST(nums, i, midIdx - 1);
  // set rootNode.right to be result of recursively calling function with updated indexes
  rootNode.right = sortedArrayToBST(nums, midIdx + 1, j);
  // return rootNode
  return rootNode;
};
