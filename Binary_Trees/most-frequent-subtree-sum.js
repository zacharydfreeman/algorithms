/* 
Given the root of a binary tree, return the most frequent subtree sum. If there is a tie, return all the values with the highest frequency in any order.

The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).

Input: root = [5,2,-3]
Output: [2,-3,4]

Input: root = [5,2,-5]
Output: [2]
*/

// O(n) time | O(n) space
const findFrequentTreeSum = (root) => {
  const sums = {};
  const dfs = (root) => {
    if (!root) return 0;
    const leftSum = dfs(root.left);
    const rightSum = dfs(root.right);
    const total = root.val + leftSum + rightSum;
    sums[total] = sums[total] + 1 || 1;
    return total;
  };
  dfs(root);
  let maxCount = 0;
  let output = [];
  for (let sum in sums) {
    if (sums[sum] === maxCount) output.push(Number(sum));
    if (sums[sum] > maxCount) {
      maxCount = sums[sum];
      output = [Number(sum)];
    }
  }
  return output;
};
