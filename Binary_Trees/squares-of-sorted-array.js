/* 
Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].

Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]

*/

// Approach: Two Pointer
// O(n) time | O(n) space
const sortedSquares = (nums) => {
  const output = new Array(nums.length);
  let l = 0;
  let r = nums.length - 1;
  for (let i = output.length - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      output[i] = nums[l] * nums[l];
      l++;
    } else {
      output[i] = nums[r] * nums[r];
      r--;
    }
  }
  return output;
};
