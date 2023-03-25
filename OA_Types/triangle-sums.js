/*

You are given a 0-indexed integer array nums, where nums[i] is a digit between 0
and 9 (inclusive).

The triangular sum of nums is the value of the only element present in nums
after the following process terminates:

Let nums comprise of n elements. If n == 1, end the process. Otherwise, create a new 0-indexed integer array newNums of length n - 1.
For each index i, where 0 <= i < n - 1, assign the value of newNums[i] as (nums[i] + nums[i+1]) % 10, where % denotes modulo operator.
Replace the array nums with newNums.
Repeat the entire process starting from step 1.
Return the triangular sum of nums.
 */

// O(n) time | O(n) space
const triangularSum = (nums) => {
  // declare length variable
  let count = nums.length;
  while (count > 1) {
    for (let i = 0; i < nums.length - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    count--;
  }
  return nums[0];
};

// O(n) time | O(n) space
const triangularSum2 = (nums) => {
  let currentArray = nums;
  while (currentArray.length > 1) {
    const newArray = new Array(currentArray.length - 1);
    for (let i = 0; i < newArray.length; i++) {
      newArray[i] = (currentArray[i] + currentArray[i + 1]) % 10;
    }
    currentArray = newArray;
  }
  return currentArray[0];
};
