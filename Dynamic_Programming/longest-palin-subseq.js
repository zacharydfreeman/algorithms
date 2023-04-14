/* 
Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".

*/

// O(n^2) time | O(n^2) space where n is the length of the string
const longestPalindromeSubseq = (s, i = 0, j = s.length - 1, memo = {}) => {
  const key = i + ',' + j;
  if (key in memo) return memo[key];
  if (i === j) return 1;
  if (i > j) return 0;

  if (s[i] === s[j]) {
    memo[key] = 2 + longestPalindromeSubseq(s, i + 1, j - 1, memo);
  } else {
    const result = longestPalindromeSubseq(s, i + 1, j, memo);
    const result2 = longestPalindromeSubseq(s, i, j - 1, memo);
    memo[key] = Math.max(result, result2);
  }

  return memo[key];
};
