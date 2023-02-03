/*
Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.
 */

// O(n + m) time | O(min(n, m)) there n and m are the lengths of the input arrays
const intersect = (nums1, nums2) => {
  // declare two maps
  const nums1Map = createMap(nums1);
  const nums2Map = createMap(nums2);
  // decalre output variable
  const output = [];
  // loop through one map
  for (let num in nums1Map) {
    const count = Math.min(nums1Map[num], nums2Map[num] || 0);
    for (let i = 0; i < count; i++) {
      output.push(Number(num));
    }
  }
  return output;
};

const createMap = (nums) => {
  const map = {};
  for (let num of nums) {
    map[num] = (map[num] || 0) + 1;
  }
  return map;
};

// Approach: Sort the arrays and use two pointer approach
// O(nlog(n) + mlog(m)) time | O(min(n, m) space
const intersect2 = (nums1, nums2) => {
  // sort both arrays
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  // declare pointers variables and output
  let i = 0; // nums1 pointer
  let j = 0; // num2 pointer
  const output = [];

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      output.push(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return output;
};
