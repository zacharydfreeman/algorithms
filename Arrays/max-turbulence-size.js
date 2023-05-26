/* 
Given an integer array arr, return the length of a maximum size turbulent subarray of arr.

A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.

More formally, a subarray [arr[i], arr[i + 1], ..., arr[j]] of arr is said to be turbulent if and only if:

For i <= k < j:
arr[k] > arr[k + 1] when k is odd, and
arr[k] < arr[k + 1] when k is even.
Or, for i <= k < j:
arr[k] > arr[k + 1] when k is even, and
arr[k] < arr[k + 1] when k is odd.

Input: arr = [9,4,2,10,7,8,8,1,9]
Output: 5
Explanation: arr[1] > arr[2] < arr[3] > arr[4] < arr[5]

Input: arr = [4,8,12,16]
Output: 2

Input: arr = [100]
Output: 1

*/

// Approach: Sliding Window
// O(n) time | O(1) space
const maxTurbulenceSize = (nums) => {
  let lastDiff = null;
  let max = 1;
  let l = 0;
  for (let r = 1; r < nums.length; r++) {
    const curDiff = nums[r] - nums[r - 1];
    if (curDiff === 0) {
      l = r;
      lastDiff = null;
    } else if (
      lastDiff === null ||
      (lastDiff < 0 && curDiff > 0) ||
      (lastDiff > 0 && curDiff < 0)
    ) {
      lastDiff = curDiff;
    } else {
      l = r - 1;
      lastDiff = curDiff;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
};
