/* 
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

*/

// Approach: Sliding Window
// O(n) time | O(1) space
const longestOnes = (nums, k) => {
  let numOnes = 0;
  let maxOnes = 0;
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    numOnes += nums[r];
    // condition where window is not valid => length of window is larger than numOnes + k
    while (r - l + 1 > numOnes + k) {
      numOnes -= nums[l++];
    }

    maxOnes = Math.max(maxOnes, r - l + 1);
  }
  return maxOnes;
};
