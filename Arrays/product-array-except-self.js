/* 
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

[1, 1, 2, 6] // left
[24, 12, 4, 1] // right
[24, 12, 8, 6]
*/

// Prefix Products
// O(n) time | O(n) space
const productExceptSelf = (nums) => {
  const output = new Array(nums.length).fill(1);
  let runningProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    output[i] = runningProduct;
    runningProduct *= nums[i];
  }
  runningProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    output[i] *= runningProduct;
    runningProduct *= nums[i];
  }
  return output;
};
