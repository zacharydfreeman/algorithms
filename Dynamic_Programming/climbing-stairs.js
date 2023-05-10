/**
 * You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 */

// Approach: Tabulaion Optimized
// O(n) time | O(1) space
const climbStairs = (n) => {
  let ways = [1, 1];
  for (let stairs = 2; stairs <= n; stairs++) {
    const temp = ways[1];
    ways[1] = ways[0] + ways[1];
    ways[0] = temp;
  }
  return ways[1];
};

// Approach: 1D DP/Tabulation
// O(n) time | O(n) space
const climbStairs2 = (n) => {
  const dp = new Array(n + 1).fill(1);
  for (let stairs = 2; stairs <= n; stairs++) {
    dp[stairs] = dp[stairs - 1] + dp[stairs - 2];
  }
  return dp[n];
};
