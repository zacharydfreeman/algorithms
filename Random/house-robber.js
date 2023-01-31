/*

You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed.
All houses at this place are arranged in a circle.
That means the first house is the neighbor of the last one.
Meanwhile, adjacent houses have a security system connected, and it
will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house,
return the maximum amount of money you can rob tonight without alerting the police.


Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Input: nums = [1,2,3]
Output: 3


/**
 * @param {number[]} nums
 * @return {number}
 */

// [1, 2, 3, 1]
// [1, 2, 4, 4,max(4, 1 + ) ] maxSums

// [1, 2, 3, 1]
const rob = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  const newArray1 = nums.slice(0, nums.length - 1);
  const newArray2 = nums.slice(1, nums.length);
  let ans1 = _rob(newArray1);
  let ans2 = _rob(newArray2);
  return Math.max(ans1, ans2);
};

const _rob = function (nums) {
  // max non adjacent num
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const maxSums = new Array(nums.length);
  maxSums[0] = nums[0];
  maxSums[1] = nums[0] > nums[1] ? nums[0] : nums[1];

  for (let i = 2; i < nums.length; i++) {
    maxSums[i] = Math.max(maxSums[i - 1], nums[i] + maxSums[i - 2]);
  }
  return maxSums[maxSums.length - 1];
};

console.log(rob([2, 3, 2]));
