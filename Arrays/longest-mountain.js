/*
You may recall that an array arr is a mountain array if and only if:

arr.length >= 3
There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given an integer array arr, return the length of the longest subarray, which is a mountain. Return 0 if there is no mountain subarray.

Input: arr = [2,1,4,7,3,2,5]
Output: 5
Explanation: The largest mountain is [1,4,7,3,2] which has length 5.

Input: arr = [2,2,2]
Output: 0
Explanation: There is no mountain.

 */

// O(n) time | O(1) space
const longestMountain = (arr) => {
  let max = 0;
  let idx = 1;
  while (idx < arr.length - 1) {
    const isPeak = arr[idx] > arr[idx - 1] && arr[idx] > arr[idx + 1];
    if (isPeak) {
      // go as far left as possible
      let l = idx - 1;
      while (l >= 0 && arr[l] < arr[l + 1]) {
        l--;
      }
      // go as far right as possible
      let r = idx + 1;
      while (r < arr.length && arr[r] < arr[r - 1]) {
        r++;
      }
      // max logic
      max = Math.max(max, r - l - 1);
      // update idx pointer
      idx = r;
    } else {
      idx++;
    }
  }
  return max;
};

const arr = [2, 2, 2];
console.log(longestMountain(arr));
