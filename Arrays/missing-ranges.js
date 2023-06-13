/* 
You are given an inclusive range [lower, upper] and a sorted unique integer array nums, where all elements are within the inclusive range.

A number x is considered missing if x is in the range [lower, upper] and x is not in nums.

Return the shortest sorted list of ranges that exactly covers all the missing numbers. That is, no element of nums is included in any of the ranges, and each missing number is covered by one of the ranges.


*/

// O(n) time | O(n) space
const findMissingRanges = (nums, lower, upper) => {
  const n = nums.length;
  if (n === 0) return [[lower, upper]];
  const output = [];
  // check for any missing numbers between the lower bound and nums
  if (lower < nums[0]) {
    output.push([lower, nums[0] - 1]);
  }

  for (let i = 1; i < n; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      output.push([nums[i - 1] + 1, nums[i] - 1]);
    }
  }

  // check for missing numbers between last element of nums and upper bound
  if (upper > nums[n - 1]) {
    output.push([nums[n - 1] + 1, upper]);
  }

  return output;
};
