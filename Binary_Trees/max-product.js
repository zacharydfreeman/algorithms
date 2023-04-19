/**
 * Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.

Note that you need to maximize the answer before taking the mod and not after taking it.
 */

// O(n) time | O(n) space
const maxProduct = (root) => {
  const sums = [];
  const totalSum = dfs(root, sums);
  let max = 0;
  for (let sum of sums) {
    max = Math.max(max, sum * (totalSum - sum));
  }
  return max % (Math.pow(10, 9) + 7);
};

const dfs = (root, sums) => {
  if (!root) return 0;
  const leftSum = dfs(root.left, sums);
  const rightSum = dfs(root.right, sums);
  const totalSum = leftSum + rightSum + root.val;
  sums.push(totalSum);
  return totalSum;
};
