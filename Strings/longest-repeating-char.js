/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
 */

// Approach: Sliding Window
// O(n) time | O(1) space
const characterReplacement = (s, k) => {
  // declare freq map and max freq var
  const freqMap = {};
  let maxFreq = 0;
  let maxLength = 0;
  let i = 0; // left of sliding window
  let j = 0; // right of sliding window
  while (j < s.length) {
    freqMap[s[j]] = freqMap[s[j]] + 1 || 1;
    // determine max frequency in any window we have seen
    maxFreq = Math.max(maxFreq, freqMap[s[j]]);
    // determine if window is valid
    const isValid = j - i + 1 - maxFreq <= k;
    // if not valid, move left pointer by 1
    if (!isValid) {
      // decrement freq map
      freqMap[s[i]]--;
      i++;
    }
    // determine max length
    maxLength = Math.max(maxLength, j - i + 1);
    j++;
  }
  // return maxLength
  return maxLength;
};
