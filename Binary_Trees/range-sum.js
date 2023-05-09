/**
 * Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].
 * 
 * Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.

Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.
 */

// O(n) time | O(h) space
const rangeSumBST = (root, low, high) => {
  // base case if root is null, return 0
  if (!root) return 0;
  // recursively call function on left and right subtree to get sums
  const leftSum = rangeSumBST(root.left, low, high);
  const rightSum = rangeSumBST(root.right, low, high);
  // if root.val is within range add to left and right sum, then return
  if (root.val >= low && root.val <= high) return root.val + leftSum + rightSum;
  // return left + right sum if root.val is not within range
  return leftSum + rightSum;
};
