/**
 * Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Input: nums = [2,0,1]
Output: [0,1,2]
 */

// O(n) time | O(1) space
const sortColors = (nums) => {
  // decalre counts array that will store the number of time a number appears in the array
  const counts = [0, 0, 0];
  for (let num of nums) {
    counts[num] += 1;
  }
  // sort array in place
  let idx = 0;
  for (let i = 0; i < counts.length; i++) {
    for (let j = 0; j < counts[i]; j++) {
      nums[idx] = i;
      idx++;
    }
  }
  // return nums
  return nums;
};
