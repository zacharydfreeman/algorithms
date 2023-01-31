/*
Given an array of distinct integers nums and a target integer target,
return the number of possible combinations that add up to target.

Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
*/

// Approach: Tabulation
// O(n*k) time | O(n) space where n is target and k is length of nums array
const combinationSum2 = (nums, target) => {
  // declare ways away filled with 0
  const ways = new Array(target + 1).fill(0);
  // num ways to sum to 0 is 1
  ways[0] = 1;
  for (let i = 1; i < ways.length; i++) {
    for (let num of nums) {
      // if i - num >= 0 then you want to add ways at that result to ways[i]
      if (i - num >= 0) {
        ways[i] += ways[i - num];
      }
    }
  }

  return ways[target];
};

// Approach: Recusrive tree structure
// O(n*k) time | O(n) space where n is the target and k is length of nums array
const combinationSum3 = (nums, target, memo = {}) => {
  // memoization
  if (target in memo) return memo[target];
  // base cases
  if (target === 0) return 1;
  if (target < 0) return 0;

  let ways = 0;
  for (let num of nums) {
    ways += combinationSum3(nums, target - num);
  }
  memo[target] = ways;
  return memo[target];
};
