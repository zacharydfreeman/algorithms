/* 
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

Input: nums = [1], target = 1
Output: 1

*/

// Approach: Top Down DP with Memoization
// O(t * n) time | O(t * n) space where t is the sum of the nums array and n is the length of nums array
const findTargetSumWays = (nums, target) => {
  return dfs(nums, 0, 0, target);
};

const dfs = (nums, idx, currentSum, target, memo = {}) => {
  const key = idx + ',' + currentSum;
  if (key in memo) return memo[key];
  // base case if currentSum = target
  if (currentSum === target && idx === nums.length) return 1;
  // if idx = nums.length
  if (idx === nums.length) return 0;
  memo[key] =
    dfs(nums, idx + 1, currentSum + nums[idx], target, memo) +
    dfs(nums, idx + 1, currentSum - nums[idx], target, memo);
  return memo[key];
};
