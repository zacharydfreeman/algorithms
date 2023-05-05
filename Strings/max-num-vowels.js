/* 
Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.

Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.

Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.

*/

// Approach: Sliding window
// O(n) time | O(1) space
const maxVowels = (s, k) => {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let count = 0;
  // initialize window
  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) count++;
  }
  // declare pointers and max variable
  let max = count;
  let i = 1;
  let j = k;
  while (j < s.length) {
    // check if char at i - 1 was a vowel. If so, remove
    if (vowels.has(s[i - 1])) count--;
    // check if chat at j is a vowel. If so, add to count
    if (vowels.has(s[j])) count++;
    // update max
    max = Math.max(max, count);
    // update pointers
    i++;
    j++;
  }
  return max;
};
