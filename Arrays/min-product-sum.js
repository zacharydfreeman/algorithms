/*
The product sum of two equal-length arrays a and b is equal to the sum of a[i] * b[i] for all 0 <= i < a.length (0-indexed).

For example, if a = [1,2,3,4] and b = [5,2,3,1], the product sum would be 1*5 + 2*2 + 3*3 + 4*1 = 22.
Given two arrays nums1 and nums2 of length n, return the minimum product sum if you are allowed to rearrange the order of the elements in nums1. 

Input: nums1 = [5,3,4,2], nums2 = [4,2,2,5]
Output: 40
Explanation: We can rearrange nums1 to become [3,5,4,2]. The product sum of [3,5,4,2] and [4,2,2,5] is 3*4 + 5*2 + 4*2 + 2*5 = 40.

Input: nums1 = [2,1,4,5,7], nums2 = [3,2,4,8,6]
Output: 65
Explanation: We can rearrange nums1 to become [5,7,4,1,2]. The product sum of [5,7,4,1,2] and [3,2,4,8,6] is 5*3 + 7*2 + 4*4 + 1*8 + 2*6 = 65.

*/

// Approach: Counting Sort because values will not be greater than 100 (constraint)
// O(n + k) time | O(k) space where n is length of array and k is the range of values in nums1 or nums2
const minProductSum = (nums1, nums2) => {
  const count1 = new Array(101).fill(0);
  const count2 = new Array(101).fill(0);
  for (let i = 0; i < nums1.length; i++) {
    count1[nums1[i]]++;
    count2[nums2[i]]++;
  }
  // two pointer
  let p1 = 0;
  let p2 = count1.length - 1;
  let ans = 0;

  while (p1 < count1.length && p2 > 0) {
    while (p1 < count1.length && count1[p1] === 0) {
      p1++;
    }

    while (p2 > 0 && count2[p2] === 0) {
      p2--;
    }

    if (p1 === count1.length || p2 === 0) break;

    ans += p1 * p2;
    count1[p1]--;
    count2[p2]--;
  }
  return ans;
};

// Approach: Sort
// O(nlog(n)) time | O(n) space
const minProductSum2 = (nums1, nums2) => {
  // sort both arrays
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => b - a);
  let res = 0;

  for (let i = 0; i < nums1.length; i++) {
    res += nums1[i] * nums2[i];
  }

  return res;
};
