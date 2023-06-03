/* 
Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
*/

// Approach: DP with Optimized Tabulation
// O(n * m) time | O(m) space
const canPartition = (nums) => {
  // get sum
  const sum = nums.reduce((total, num) => (total += num));
  // if sum is odd return false
  if (sum % 2 !== 0) return false;
  // declare subsetSum and dpSet that will track all sums
  const subsetSum = sum / 2;
  let dpSet = new Set([0]);
  for (let num of nums) {
    const nextDPSet = new Set();
    for (let sum of dpSet) {
      if (sum + num === subsetSum) return true;
      nextDPSet.add(sum + num);
      nextDPSet.add(sum);
    }
    dpSet = nextDPSet;
  }
  return false;
};

// Top Down DP with Memoization
// O(n * m) time | O(n * m) space where n is length of nums and m is subset sum
const canPartition2 = (nums) => {
  const targetSum = nums.reduce((total, num) => (total += num));
  if (targetSum % 2 !== 0) return false;
  const memo = new Array(nums.length)
    .fill()
    .map(() => new Array(targetSum + 1).fill(-1));
  return dfs(nums, 0, targetSum / 2, memo);
};

const dfs = (nums, idx, targetSum, memo) => {
  // if target sum = 0, return true
  if (targetSum === 0) return true;
  // if idx reaches end of array return false or if targetSum < 0
  if (idx === nums.length || targetSum < 0) return false;
  if (memo[idx][targetSum] !== -1) return memo[idx][targetSum];
  memo[idx][targetSum] =
    dfs(nums, idx + 1, targetSum, memo) ||
    dfs(nums, idx + 1, targetSum - nums[idx], memo);
  return memo[idx][targetSum];
};
