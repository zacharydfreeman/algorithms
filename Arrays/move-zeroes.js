/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Input: nums = [0]
Output: [0]
 */

// Approach: Two pointers and swapping
// O(n) time | O(1) space
const moveZeroes = (nums) => {
  let i = 0;
  let j = 1;
  while (j < nums.length) {
    if (i === j) {
      j++;
    }
    if (nums[j] === 0) {
      j++;
    } else if (nums[i] !== 0) {
      i++;
    } else {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j++;
    }
  }
  return nums;
};
