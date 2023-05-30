/* 
Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

Input: nums = [1,0,1,1,0]
Output: 4
Explanation: 
- If we flip the first zero, nums becomes [1,1,1,1,0] and we have 4 consecutive ones.
- If we flip the second zero, nums becomes [1,0,1,1,1] and we have 3 consecutive ones.
The max number of consecutive ones is 4.

Input: nums = [1,0,1,1,0,1]
Output: 4
Explanation: 
- If we flip the first zero, nums becomes [1,1,1,1,0,1] and we have 4 consecutive ones.
- If we flip the second zero, nums becomes [1,0,1,1,1,1] and we have 4 consecutive ones.
The max number of consecutive ones is 4.

*/

// Approach: Sliding Window
// O(n) time | O(1) space
const findMaxConsecutiveOnes = (nums) => {
  let numOnes = 0;
  let maxOnes = 0;
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    numOnes += nums[r];
    // condition where window is not valid => length of window is larger than numOnes + k
    while (r - l + 1 > numOnes + 1) {
      numOnes -= nums[l++];
    }

    maxOnes = Math.max(maxOnes, r - l + 1);
  }
  return maxOnes;
};
