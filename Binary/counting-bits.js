/**
 * Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 * 
 * Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
 */

// Approach: 1D DP with Tabulation
// O(n) time | O(n) space
const countBits = (n) => {
  const dp = new Array(n + 1).fill(0);
  let offset = 1;
  for (let i = 1; i <= n; i++) {
    if (offset * 2 === i) offset = i;
    dp[i] = 1 + dp[i - offset];
  }
  return dp;
};

// O(nlog(n)) time | O(n) space
const countBits2 = (n) => {
  const output = [];
  for (let i = 0; i <= n; i++) {
    let num = i;
    let oneBits = 0;
    while (num) {
      oneBits += num % 2;
      num = Math.floor(num / 2);
    }
    output.push(oneBits);
  }
  return output;
};
