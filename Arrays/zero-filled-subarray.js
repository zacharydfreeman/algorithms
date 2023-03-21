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

// O(n) time | O(1) space where n is length of nums array
const zeroFilledSubarray = (nums) => {
  // declare count and consecutive zeros variables
  let count = 0;
  let consecutiveZeros = 0;
  for (let i = 0; i < nums.length; i++) {
    // if number is 0
    if (nums[i] === 0) {
      // increment consecutive zeros and add to count
      consecutiveZeros++;
      count += consecutiveZeros;
    } else {
      // otherwise set consecutive zeros to 0
      consecutiveZeros = 0;
    }
  }
  // return count
  return count;
};
