/*
Given a string s, find the first non-repeating character in it and return its index.
If it does not exist, return -1.

Input: s = "leetcode"
Output: 0

Input: s = "loveleetcode"
Output: 2

Input: s = "aabb"
Output: -1
 */

// O(n) time | O(1) space becuase there are 26 letters in alphabet
const firstUniqChar = (s) => {
  // create map of counts
  const counts = {};
  for (let char of s) {
    counts[char] = (counts[char] || 0) + 1;
  }
  // loop through s and check count in counts map and if 1 return
  for (let i = 0; i < s.length; i++) {
    if (counts[s[i]] === 1) return i;
  }
  return -1;
};
