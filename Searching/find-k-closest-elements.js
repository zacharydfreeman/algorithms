/* 
Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b

Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]


*/

// Approach: Modified Binary Search
// O(log(n - k) + k) time | O(k) space
const findClosestElements = (arr, k, x) => {
  // find the left most idx
  let leftIdx = -1;
  let l = 0;
  let r = arr.length - k;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (x - arr[mid] > arr[mid + k] - x) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  const output = [];
  for (let i = l; i < l + k; i++) {
    output.push(arr[i]);
  }
  return output;
};
