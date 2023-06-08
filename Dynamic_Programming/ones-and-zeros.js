/* 
You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements of y.

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.

*/

// Approach: Bottom-up DP with Tabulation
// O(l * m * n) time | O(m * n) space
const findMaxForm = (strs, m, n) => {
  const dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));
  for (let str of strs) {
    const [zeroes, ones] = getZeros(str);
    for (let row = n; row >= ones; row--) {
      for (let col = m; col >= zeroes; col--) {
        dp[row][col] = Math.max(dp[row][col], 1 + dp[row - ones][col - zeroes]);
      }
    }
  }
  return dp[n][m];
};

// Approach: Top-down DP with Memoization
// O(l * m * n) time |  O(l * m * n) space
const findMaxForm2 = (strs, m, n) => {
  const memo = {};
  return dfs(strs, 0, m, n, memo);
};

const dfs = (strs, idx, m, n, memo) => {
  // memoization
  const key = idx + ',' + m + ',' + n;
  if (key in memo) return memo[key];
  // base case if no more strs return 0
  if (idx === strs.length) return 0;
  // get number of ones and zeroes from current string
  const [zeroes, ones] = getZeros(strs[idx]);
  // dont take
  let res = dfs(strs, idx + 1, m, n, memo);
  // take only if there are enough m's and n's
  if (m - zeroes >= 0 && n - ones >= 0) {
    res = Math.max(res, 1 + dfs(strs, idx + 1, m - zeroes, n - ones, memo));
  }
  // store in memo
  memo[key] = res;
  return res;
};

const getZeros = (str) => {
  let zeroes = 0;
  let ones = 0;
  for (let char of str) {
    if (char === '1') ones++;
    if (char === '0') zeroes++;
  }
  return [zeroes, ones];
};

const strs = ['10', '0001', '111001', '1', '0'],
  m = 5,
  n = 3;

console.log(findMaxForm(strs, m, n));
