/*
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack,
or -1 if needle is not part of haystack.

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.

 */

// O(n*m) time | O(1) space
const strStr = (haystack, needle) => {
  let m = needle.length;
  let n = haystack.length;

  for (let windowStart = 0; windowStart <= n - m; windowStart++) {
    for (let i = 0; i < m; i++) {
      if (needle[i] != haystack[windowStart + i]) {
        break;
      }
      if (i == m - 1) {
        return windowStart;
      }
    }
  }

  return -1;
};

// O(n*m) time | O(1) space where n is length of haystack string and m is length of needle string
const strStr2 = (haystack, needle) => {
  let j = 0;
  for (let i = 0; i < haystack.length + 1 - needle.length; i++) {
    let k = i;
    while (haystack[k] === needle[j] && j < needle.length) {
      k++;
      j++;
    }
    if (j === needle.length) return i;
    j = 0;
  }
  return -1;
};
