/* 
Given an integer array nums, return the number of non-empty subarrays with the leftmost element of the subarray not larger than other elements in the subarray.

A subarray is a contiguous part of an array.

Input: nums = [1,4,2,5,3]
Output: 11
Explanation: There are 11 valid subarrays: [1],[4],[2],[5],[3],[1,4],[2,5],[1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3].

Input: nums = [3,2,1]
Output: 3
Explanation: The 3 valid subarrays are: [3],[2],[1].


*/

// O(n) time | O(1) space
const validSubarrays = (nums) => {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    count++;
    let nextIdx = i + 1;
    while (nums[nextIdx] >= nums[i]) {
      count++;
      nextIdx++;
    }
  }
  return count;
};
