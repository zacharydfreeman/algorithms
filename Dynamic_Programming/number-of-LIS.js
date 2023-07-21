/* 
Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.

Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1, so output 5.
*/

// O(n^2) time | O(n) space
const findNumberOfLIS = (nums) => {
  const dp = new Array(nums.length).fill(1);
  const count = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          count[i] = count[j];
        } else if (dp[i] === dp[j] + 1) {
          count[i] += count[j];
        }
      }
    }
    max = Math.max(max, dp[i]);
  }

  let ans = 0;
  for (let i = 0; i < dp.length; i++) {
    if (dp[i] === max) ans += count[i];
  }
  return ans;
};
