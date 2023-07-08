/* 

Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3

*/

// O(n) time | O(n) space
const pathSum = (root, targetSum) => {
  let count = 0;
  const sums = {};
  const dfs = (root, currentSum) => {
    if (!root) return null;
    currentSum += root.val;
    if (currentSum === targetSum) count++;
    if (currentSum - targetSum in sums) count += sums[currentSum - targetSum];
    sums[currentSum] = sums[currentSum] + 1 || 1;
    dfs(root.left, currentSum);
    dfs(root.right, currentSum);
    sums[currentSum]--;
  };
  dfs(root, 0);
  return count;
};
