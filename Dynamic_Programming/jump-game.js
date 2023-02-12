/*
You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 */

// Approach: Greedy
// O(n) time | O(1) space
const canJump = (nums) => {
  // declare a max reach variable and initialize it to 0
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    // if i > max Reach then that means the end is unreachable
    if (i > maxReach) return false;
    // update max reach
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
};

// Approach: DP with memoization
// O(n^2) time | O(n) space
const canJump2 = (nums, idx = 0, position = 0, memo = {}) => {
  // memoization
  const key = idx + "," + position;
  if (key in memo) return memo[key];
  // base case
  if (position < idx) return false;
  if (position === nums.length - 1) return true;

  // get max jumps
  const maxJump = nums[idx];
  for (let j = 1; j <= maxJump; j++) {
    if (canJump(nums, idx + j, position + j, memo)) {
      memo[key] = true;
      return memo[key];
    }
  }

  memo[key] = false;
  return memo[key];
};
