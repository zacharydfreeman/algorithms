/* 
Given a string s and an integer k, return the number of substrings in s of length k with no repeated characters.

Input: s = "havefunonleetcode", k = 5
Output: 6
Explanation: There are 6 substrings they are: 'havef','avefu','vefun','efuno','etcod','tcode'.

Input: s = "home", k = 5
Output: 0
Explanation: Notice k can be larger than the length of s. In this case, it is not possible to find any substring.

*/

// Approach: Sliding Window
// O(n) time | O(1) space
const numKLenSubstrNoRepeats = (s, k) => {
  // if k is bigger than s return 0
  if (k > s.length) return 0;
  const chars = new Array(26).fill(0);
  // initialize window
  let multipleChars = 0;

  for (let r = 0; r < k; r++) {
    const idx = s[r].charCodeAt() - 97;
    chars[idx]++;
    if (chars[idx] > 1) multipleChars++;
  }

  let count = multipleChars === 0 ? 1 : 0;
  // continue on
  let l = 1;
  for (let r = k; r < s.length; r++) {
    const leftIdx = s[l - 1].charCodeAt() - 97;
    const rightIdx = s[r].charCodeAt() - 97;
    // decrement leftIdx char
    chars[leftIdx]--;
    // if chars is greater than or equal to one that means we need to decrement multiple chars
    if (chars[leftIdx] >= 1) multipleChars--;
    // increment rightIdx
    chars[rightIdx]++;
    if (chars[rightIdx] > 1) multipleChars++;
    if (multipleChars === 0) count++;
    // increment l
    l++;
  }
  return count;
};
