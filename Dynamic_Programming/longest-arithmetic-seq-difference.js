/*
Given an integer array arr and an integer difference, return the length of the longest subsequence in arr which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals difference.

A subsequence is a sequence that can be derived from arr by deleting some or no elements without changing the order of the remaining elements.

Input: arr = [1,2,3,4], difference = 1
Output: 4
Explanation: The longest arithmetic subsequence is [1,2,3,4].

Input: arr = [1,3,5,7], difference = 1
Output: 1
Explanation: The longest arithmetic subsequence is any single element.

Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
Output: 4
Explanation: The longest arithmetic subsequence is [7,5,3,1].

*/

// Approach: 1D DP
// O(n) time | O(n) space
const longestSubsequence = (arr, difference) => {
  // declare a seen map
  const seen = {};
  // declare longest variable, initialize to 1
  let longest = 1;
  for (let num of arr) {
    // check to see if prior number using the difference is in seen
    const diff = seen[num - difference] || 0;
    const newLength = diff + 1;
    // max logic
    longest = Math.max(longest, newLength);
    // add in map
    seen[num] = newLength;
  }
  return longest;
};
