/**
 * You are given an array of integers nums (0-indexed) and an integer k.

The score of a subarray (i, j) is defined as min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1). A good subarray is a subarray where i <= k <= j.

Return the maximum possible score of a good subarray.

 Input: nums = [1,4,3,7,4,5], k = 3
Output: 15
Explanation: The optimal subarray is (1, 5) with a score of min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15. 

Input: nums = [5,5,4,5,4,1,1,1], k = 0
Output: 20
Explanation: The optimal subarray is (0, 4) with a score of min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20.
 */

// O(n) time | O(1) space
const maximumScore = (nums, k) => {
  // declare max, min, left and right variables
  let max = nums[k];
  let min = nums[k];
  let l = k;
  let r = k;
  while (l >= 0 && r < nums.length) {
    // calculate max
    max = Math.max(max, (r - l + 1) * min);
    min =
      r === nums.length - 1 || nums[l - 1] > nums[r + 1]
        ? Math.min(nums[--l], min)
        : Math.min(nums[++r], min);
  }
  return max;
};
