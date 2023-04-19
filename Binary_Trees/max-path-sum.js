/**
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.
 */

// O(n) time | O(h) space where n is the number of node and h is the height of the tree
const maxPathSum = (root) => {
  return getTreeInfo(root).maxSum;
};

class TreeInfo {
  constructor(maxSum, maxHeightSum) {
    this.maxSum = maxSum;
    this.maxHeightSum = maxHeightSum;
  }
}

const getTreeInfo = (root) => {
  // base case if root is null
  if (!root) return new TreeInfo(-Infinity, -Infinity);
  // recursively call function and get right and left tree info
  const leftInfo = getTreeInfo(root.left);
  const rightInfo = getTreeInfo(root.right);
  // calculate new max height sum
  const leftMaxHeightSum = Math.max(root.val, root.val + leftInfo.maxHeightSum);
  const rightMaxHeightSum = Math.max(
    root.val,
    root.val + rightInfo.maxHeightSum
  );
  const newMaxHeightSum = Math.max(leftMaxHeightSum, rightMaxHeightSum);
  // calculate the sum through the roo
  const sumThroughRoot =
    root.val + leftInfo.maxHeightSum + rightInfo.maxHeightSum;
  // new maxSum will be the max of sum through root, new max height sum, leftInfo max sum and rightInfo max sum
  const newMaxSum = Math.max(
    sumThroughRoot,
    newMaxHeightSum,
    leftInfo.maxSum,
    rightInfo.maxSum
  );
  return new TreeInfo(newMaxSum, newMaxHeightSum);
};
