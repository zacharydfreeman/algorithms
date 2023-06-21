/* 
Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.

*/

// O(n) time | O(n) space
const findMaxLength = (nums) => {
  const countMap = {};
  countMap[0] = -1;
  let count = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    nums[i] ? count++ : count--;
    if (count in countMap) {
      max = Math.max(max, i - countMap[count]);
    } else {
      countMap[count] = i;
    }
  }
  return max;
};
