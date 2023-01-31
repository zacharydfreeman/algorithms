/*
Given a string s, find the longest
substring without repeating characters.

Input: s = "abcabcbb"
Output: "abc"

Input: s = "bbbbb"
Output: "b"

Input: s = "clementisacap"
Output: "mentisac"
*/

// O(n) time | O(min(n, a)) space where n is length of string and a is number of characters in alphabet
const longestSubstring = (s) => {
  const lastSeen = {};
  let index = [0, 1];
  let startIdx = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // check to see if in seen and update start accordingly
    if (char in lastSeen) {
      startIdx = Math.max(startIdx, lastSeen[char] + 1);
    }
    // update index
    if (index[1] - index[0] < i + 1 - startIdx) {
      index[0] = startIdx;
      index[1] = i + 1;
    }
    // update char in seen map
    lastSeen[char] = i;
  }
  return s.slice(index[0], index[1]);
};
