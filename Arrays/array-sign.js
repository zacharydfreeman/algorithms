/* 
There is a function signFunc(x) that returns:

1 if x is positive.
-1 if x is negative.
0 if x is equal to 0.
You are given an integer array nums. Let product be the product of all values in the array nums.

Return signFunc(product).

Input: nums = [-1,-2,-3,-4,3,2,1]
Output: 1
Explanation: The product of all values in the array is 144, and signFunc(144) = 1

Input: nums = [1,5,0,2,-3]
Output: 0
Explanation: The product of all values in the array is 0, and signFunc(0) = 0

Input: nums = [-1,1,-1,1,-1]
Output: -1
Explanation: The product of all values in the array is -1, and signFunc(-1) = -1

*/

// O(n) time | O(1) space
const arraySign = (nums) => {
  // declare variable to count number of negative numbers
  let negativeNums = 0;
  for (let num of nums) {
    if (num === 0) return 0;
    if (num < 0) negativeNums++;
  }
  return negativeNums % 2 === 0 ? 1 : -1;
};

// Approach: Keep track of the sign at each iteration
// O(n) time | O(1) space
const arraySign2 = (nums) => {
  let sign = 1;
  for (let num of nums) {
    if (num === 0) return 0;
    if (num < 0) {
      sign *= -1;
    }
  }
  return sign;
};
