/* 
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Input: s1 = "ab", s2 = "eidboaoo"
Output: false

*/

// Approach: Sliding Window
// O(n) time | O(n) space
const checkInclusion = (s1, s2) => {
  // Loop through s1 to get frequency of each char
  const freq1 = new Array(26).fill(0);
  for (const i in s1) {
    const char = s1.charCodeAt(i) - 97;
    freq1[char]++;
  }

  let freq2 = new Array(26).fill(0);
  // Initialize left pointer for sliding window
  let l = 0;
  // Loop through s2 to find permutation
  for (const r in s2) {
    // Update freq2
    const char = s2.charCodeAt(r) - 97;
    freq2[char]++;
    // If freq2 > freq1, move l pointers till freq2 <= freq1
    while (freq2[char] > freq1[char]) {
      freq2[s2.charCodeAt(l) - 97]--;
      l++;
    }
    // Check if found permutation, return true
    if (r - l + 1 === s1.length) return true;
  }
  // If you havent found permuation, return false
  return false;
};
