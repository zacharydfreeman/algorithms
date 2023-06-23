/* 
Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.

Note that:

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
A sequence seq is arithmetic if seq[i + 1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).

Input: nums = [3,6,9,12]
Output: 4
Explanation:  The whole array is an arithmetic sequence with steps of length = 3.

Input: nums = [9,4,7,2,10]
Output: 3
Explanation:  The longest arithmetic subsequence is [4,7,10].

Input: nums = [20,1,15,3,10,5,8]
Output: 4
Explanation:  The longest arithmetic subsequence is [20,15,10,5].
*/

// O(n^2) time | O(n^2) space
const longestArithSeqLength = (nums) => {
  const lengths = {};
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    const currObj = {};
    for (let j = 0; j < i; j++) {
      const obj = lengths[j];
      const diff = nums[i] - nums[j];
      if (diff in obj) {
        currObj[diff] = obj[diff] + 1;
      } else {
        currObj[diff] = 1;
      }
      max = Math.max(max, currObj[diff] + 1);
    }
    lengths[i] = currObj;
  }
  return max;
};
