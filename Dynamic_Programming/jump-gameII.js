/*
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i],
you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Input: nums = [2,3,0,1,4]
Output: 2
 */

// Approach: Greedy
// O(n) time | O(1) space
const jump = (nums) => {
  // if nums length is 1 return 0
  if (nums.length === 1) return 0;
  // declare max reach and jumps variable
  let maxReach = nums[0];
  let steps = maxReach;
  let jumps = 1;
  // loop until second to last element
  for (let i = 1; i < nums.length - 1; i++) {
    // decrement steps
    steps--;
    // update max Reach
    maxReach = Math.max(maxReach, i + nums[i]);
    // if steps === 0, you have to make a jump
    if (steps === 0) {
      jumps++;
      steps = maxReach - i;
    }
  }
  return jumps;
};

// Approach: Bottoms up 1D DP
// O(n^2) time | O(n) space
const jump2 = (nums) => {
  const jumps = new Array(nums.length).fill(Infinity);
  jumps[0] = 0;

  for (let i = 1; i < jumps.length; i++) {
    for (j = 0; j < i; j++) {
      // if you can reach current index from j, update jumps[i]
      if (nums[j] >= i - j) {
        jumps[i] = Math.min(jumps[i], jumps[j] + 1);
      }
    }
  }
  return jumps[jumps.length - 1];
};

// Approach: Top down DP with memoization
// O(n^2) time | O(n) space
const jump3 = (nums, idx = 0, position = 0, memo = {}) => {
  // memoize
  const key = idx + "," + position;
  if (key in memo) return memo[key];
  // base cases if position if greater than length of nums
  if (position > nums.length - 1) return Infinity;
  if (position === nums.length - 1) return 0;
  // get max jump at index and declare min jumps variable
  const maxJump = nums[idx];
  let minJumps = Infinity;
  for (let j = 1; j <= maxJump; j++) {
    // make recursive call
    const result = jump(nums, idx + j, position + j, memo);
    minJumps = Math.min(minJumps, 1 + result);
  }

  memo[key] = minJumps;
  return memo[key];
};
