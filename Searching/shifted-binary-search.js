/* 

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Input: nums = [1], target = 0
Output: -1
*/

// O(log(n)) time | O(1) space
const search = (nums, target) => {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const midIdx = Math.floor((low + high) / 2);
    const midNum = nums[midIdx];
    const lowNum = nums[low];
    const highNum = nums[high];

    if (midNum === target) return midIdx;

    if (midNum >= lowNum) {
      if (target < midNum && target >= lowNum) {
        high = midIdx - 1;
      } else {
        low = midIdx + 1;
      }
    } else {
      if (target > midNum && target <= highNum) {
        low = midIdx + 1;
      } else {
        high = midIdx - 1;
      }
    }
  }

  return -1;
};
