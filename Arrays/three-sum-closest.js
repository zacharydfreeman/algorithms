/*
Given an integer array nums of length n and an integer target,
find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
*/

// Approach: Sort array and use two pointers
// O(n^2) time | O(1) space
const threeSumClosest = (nums, target) => {
  // sort array
  nums.sort((a, b) => a - b);
  // declare closest and difference variable
  let closest = Infinity;
  let difference = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    // declare two pointers
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      // calculate current sum
      const sum = nums[i] + nums[l] + nums[r];
      // if sum === target return target
      if (sum === target) return target;
      if (Math.abs(sum - target) < difference) {
        closest = sum;
        difference = Math.abs(sum - target);
      }
      // update pointers
      if (sum > target) {
        r--;
      } else {
        l++;
      }
    }
  }

  return closest;
};
