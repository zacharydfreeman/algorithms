/* 
Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
Note that the integers in the lists may be returned in any order.

Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums2. Therefore, answer[1] = [4,6].


*/

// O(n + m) time | O(max(n, m)) where n is the length of nums1 and m is the length of nums2
const findDifference = (num1, num2) => {
  const nums1Map = {};
  const nums2Map = {};
  for (let num of num1) {
    nums1Map[num] = true;
  }
  for (let num of num2) {
    nums2Map[num] = true;
  }

  const output1 = new Set();
  const output2 = new Set();
  for (let num of num1) {
    if (!(num in nums2Map)) output1.add(num);
  }
  for (let num of num2) {
    if (!(num in nums1Map)) output2.add(num);
  }

  return [[...output1], [...output2]];
};
