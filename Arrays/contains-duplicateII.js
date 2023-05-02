/*
Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Input: nums = [1,2,3,1], k = 3
Output: true

Input: nums = [1,0,1,1], k = 1
Output: true

Input: nums = [1,2,3,1,2,3], k = 2
Output: false

*/

// O(n) time | O(n) space
const containsNearbyDuplicate = (nums, k) => {
  // declare seen hash map that will contain the number and first index seen
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num in seen) {
      const firstIdx = seen[num];
      if (i - firstIdx <= k) return true;
    }
    seen[num] = i;
  }
  return false;
};
