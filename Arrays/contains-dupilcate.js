/*
Given an integer array nums, return true if any value appears at least twice in the array,
and return false if every element is distinct.

Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false
*/

// O(n) time | O(n) space
const containsDupilicate = (nums) => {
  const seen = {};
  for (let num of nums) {
    if (num in seen) return true;
    seen[num] = true;
  }
  return false;
};

// O(nlog(n)) time | O(1) space
const containsDupilcate2 = (nums) => {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }
  return false;
};

// O(n^2) time | O(1) space
const containsDuplicate3 = (nums) => {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
};
