/* 
Given a string s, return the length of the longest 
substring
 that contains at most two distinct characters.

Input: s = "eceba"
Output: 3
Explanation: The substring is "ece" which its length is 3.

Input: s = "ccaabbb"
Output: 5
Explanation: The substring is "aabbb" which its length is 5.
*/

// O(n) time | O(1) space
const lengthOfLongestSubstringTwoDistinct = (s) => {
  const freqMap = {};
  let distinct = 0; // distinct character count
  let longest = 0; // length of longest valid string
  let l = 0; // left pointer
  for (let r = 0; r < s.length; r++) {
    const char = s[r]; // grab current char
    // if char is not in freqMap or count euqal to 0, increment distinct count
    if (!(char in freqMap) || freqMap[char] === 0) distinct++;
    freqMap[char] = freqMap[char] + 1 || 1;
    // while distinct count > 2, shrink window
    while (distinct > 2) {
      freqMap[s[l]]--;
      if (freqMap[s[l]] === 0) distinct--;
      l++;
    }
    // max logic
    longest = Math.max(longest, r - l + 1);
  }
  // return longest
  return longest;
};

// Approach: Sliding Window
// O(26 * n) time | O(1) space
const lengthOfLongestSubstringTwoDistinct2 = (s) => {
  const freqMap = {};
  let maxFreq = 0;
  let longest = 0;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const char = s[r];
    freqMap[char] = freqMap[char] + 1 || 1;

    while (!countDistinct(freqMap)) {
      freqMap[s[l++]]--;
    }

    longest = Math.max(longest, r - l + 1);
  }

  return longest;
};

const countDistinct = (map) => {
  let count = 0;
  for (let key in map) {
    if (map[key] > 0) count++;
  }
  return count <= 2;
};
