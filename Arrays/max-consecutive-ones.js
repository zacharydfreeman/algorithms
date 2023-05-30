/* 
Given a binary array nums, return the maximum number of consecutive 1's in the array.

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

Input: nums = [1,0,1,1,0,1]
Output: 2

*/

// Approach: Sliding Window
// O(n) time | O(1) space
const findMaxConsecutiveOnes = (nums) => {
  let numOnes = 0;
  let l = 0;
  let maxOnes = 0;
  for (let r = 0; r < nums.length; r++) {
    numOnes += nums[r];

    while (r - l + 1 > numOnes) {
      numOnes -= nums[l++];
    }

    maxOnes = Math.max(maxOnes, r - l + 1);
  }
  return maxOnes;
};
