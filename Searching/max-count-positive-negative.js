/* 
Given an array nums sorted in non-decreasing order, return the maximum between the number of positive integers and the number of negative integers.

In other words, if the number of positive integers in nums is pos and the number of negative integers is neg, then return the maximum of pos and neg.
Note that 0 is neither positive nor negative.

Input: nums = [-2,-1,-1,1,2,3]
Output: 3
Explanation: There are 3 positive integers and 3 negative integers. The maximum count among them is 3.

Input: nums = [-3,-2,-1,0,0,1,2]
Output: 3
Explanation: There are 2 positive integers and 3 negative integers. The maximum count among them is 3.

Input: nums = [5,20,66,1314]
Output: 4
Explanation: There are 4 positive integers and 0 negative integers. The maximum count among them is 4.

*/

// Approach: Binary Search
// O(log(n)) time | O(1) space
const maximumCount = (nums) => {
  let l = 0;
  let r = nums.length - 1;
  let positiveIdx = null;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] > 0) {
      positiveIdx = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  l = 0;
  r = nums.length - 1;
  let negativeIdx = null;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] < 0) {
      negativeIdx = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  if (positiveIdx === null && negativeIdx === null) return 0;

  positiveIdx = positiveIdx !== null ? positiveIdx : Infinity;
  negativeIdx = negativeIdx !== null ? negativeIdx : -Infinity;

  return Math.max(negativeIdx + 1, nums.length - positiveIdx);
};
