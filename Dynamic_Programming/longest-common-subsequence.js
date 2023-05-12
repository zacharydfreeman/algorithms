/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.
 * 
 *Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 */

// Approach: 2D DP with Tabulation Optimized for Space
// O(n * m) time | O(n) space
const longestCommonSubsequence = (text1, text2) => {
  let previousRow = new Array(text1.length + 1).fill(0);
  for (let row = 1; row <= text2.length; row++) {
    const currentRow = new Array(text1.length + 1).fill(0);
    for (let col = 1; col <= text1.length; col++) {
      if (text1[col - 1] === text2[row - 1]) {
        currentRow[col] = 1 + previousRow[col - 1];
      } else {
        currentRow[col] = Math.max(currentRow[col - 1], previousRow[col]);
      }
    }
    previousRow = currentRow;
  }
  return previousRow[text1.length];
};

// Approach: 2D DP with Tabulation
// Build a 2d matrix that essentially solves the problem but with smaller strings
// O(n * m) time | O(n * m) space
const longestCommonSubsequence2 = (text1, text2) => {
  // initialize the 2d array
  const dp = [];
  for (let row = 0; row <= text1.length; row++) {
    const newRow = [];
    for (let col = 0; col <= text2.length; col++) {
      newRow.push(0);
    }
    dp.push(newRow);
  }

  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col < dp[0].length; col++) {
      if (text1[row - 1] === text2[col - 1]) {
        dp[row][col] = 1 + dp[row - 1][col - 1];
      } else {
        dp[row][col] = Math.max(dp[row][col - 1], dp[row - 1][col]);
      }
    }
  }
  return dp[text1.length][text2.length];
};
