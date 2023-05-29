/* 
Given an array of positive integers nums and a positive integer target, return the minimal length of a 
subarray
 whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Input: target = 4, nums = [1,4,4]
Output: 1

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

*/

// O(n) time | O(1) space
const minSubArrayLen = (target, nums) => {
  let minLength = Infinity;
  let sum = 0;
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];

    while (sum >= target) {
      minLength = Math.min(minLength, r - l + 1);
      sum -= nums[l];
      l++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
};
