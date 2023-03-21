/* 
Given an integer array nums, return the number of subarrays filled with 0.

A subarray is a contiguous non-empty sequence of elements within an array.

Input: nums = [1,3,0,0,2,0,0,4]
Output: 6
Explanation: 
There are 4 occurrences of [0] as a subarray.
There are 2 occurrences of [0,0] as a subarray.
There is no occurrence of a subarray with a size more than 2 filled with 0. Therefore, we return 6.

Input: nums = [0,0,0,2,0,0]
Output: 9
Explanation:
There are 5 occurrences of [0] as a subarray.
There are 3 occurrences of [0,0] as a subarray.
There is 1 occurrence of [0,0,0] as a subarray.
There is no occurrence of a subarray with a size more than 3 filled with 0. Therefore, we return 9.
*/

// Approach: Sliding Window
const zeroFilledSubarray = (nums) => {
  let i = 0;
  let j = 0;
  let count = 0;
  while (j <= nums.length) {
    if (i === j) {
      j++;
    } else if (nums[j] === 0) {
      j++;
    } else if (nums[i] === 0) {
      count += factorial(j - i);
      i = j;
    } else {
      i++;
    }
  }
  return count;
};

const factorial = (num) => {
  let product = 1;
  for (let i = 1; i <= num; i++) {
    product *= i;
  }
  return product;
};

console.log(zeroFilledSubarray([1, 3, 0, 0, 2, 0, 0, 4]));
