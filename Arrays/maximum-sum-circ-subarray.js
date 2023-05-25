/* 
Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.

A circular array means the end of the array connects to the beginning of the array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].

A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.

Input: nums = [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3.

Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.

Input: nums = [-3,-2,-3]
Output: -2
Explanation: Subarray [-2] has maximum sum -2.

*/

// Approach: Kadane's for both max and min
// O(n) time | O(1) space
const maxSubarraySumCircular = (nums) => {
  let maxSoFar = -Infinity;
  let maxSum = -Infinity;
  let minSoFar = Infinity;
  let minSum = Infinity;
  let total = 0;
  for (let num of nums) {
    // update global maxs
    maxSoFar = Math.max(maxSoFar + num, num);
    maxSum = Math.max(maxSum, maxSoFar);
    // update global mins
    minSoFar = Math.min(minSoFar + num, num);
    minSum = Math.min(minSum, minSoFar);
    total += num;
  }
  if (maxSum < 0) return maxSum;
  return Math.max(maxSum, total - minSum);
};
