/* 
Given a string s and an integer k, return the length of the longest 
substring
 of s that contains at most k distinct characters.

 Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.

Input: s = "aa", k = 1
Output: 2
Explanation: The substring is "aa" with length 2.


*/

// Approach: Sliding Window
// O(n) time | O(1) space
const lengthOfLongestSubstringKDistinct = (s, k) => {
  const freqMap = {};
  let distinct = 0; // distinct character count
  let longest = 0; // length of longest valid string
  let l = 0; // left pointer
  for (let r = 0; r < s.length; r++) {
    const char = s[r]; // grab current char
    // if char is not in freqMap or count euqal to 0, increment distinct count
    if (!(char in freqMap) || freqMap[char] === 0) distinct++;
    freqMap[char] = freqMap[char] + 1 || 1;
    // while distinct count > k, shrink window
    while (distinct > k) {
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
