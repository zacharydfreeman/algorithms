/**
Given a string s, return true if a permutation of the string could form a 
palindrome and false otherwise.

Input: s = "code"
Output: false

Input: s = "aab"
Output: true

Input: s = "carerac"
Output: true
 */

// Approach: Make a char count hash map and determine how many odd counts there are
// O(n) time | O(1) space
const canPermutePalindrome = (str) => {
  if (typeof str !== 'string') return false;
  const counts = {};
  for (let char of str) {
    counts[char] = counts[char] + 1 || 1;
  }
  let odd = 0;
  for (let char in counts) {
    if (counts[char] % 2) odd++;
  }

  return odd <= 1;
};
