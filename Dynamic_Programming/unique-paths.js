/* 
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

*/

// Approach: Optimized Tabulation
// O(m * n) time | O(n) space
const uniquePaths = (m, n) => {
  let prevRow = new Array(n).fill(1);
  for (let row = 1; row < m; row++) {
    const currentRow = new Array(n).fill(1);
    for (let col = 1; col < n; col++) {
      currentRow[col] = prevRow[col] + currentRow[col - 1];
    }
    prevRow = currentRow;
  }
  return prevRow[n - 1];
};

// Approach: 2D DP with Tabulation
// O(m * n) time | O(m * n) space
const uniquePaths2 = (m, n) => {
  const dp = new Array(m).fill().map(() => new Array(n).fill(1));
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// Approach: DP with Recursion
// O(m * n) time | O(m * n) space
const uniquePaths3 = (m, n) => {
  return _uniquePaths(m, n, 0, 0, {});
};
const _uniquePaths = (m, n, row, col, memo) => {
  // if out of bounds return 0
  if (row === m || col === n) return 0;
  // if we hit the bottom right position, return 1
  if (row === m - 1 && col === n - 1) return 1;
  const key = row + ',' + col;
  if (key in memo) return memo[key];
  // declare total ways variable
  let ways = 0;
  ways += _uniquePaths(m, n, row + 1, col, memo);
  ways += _uniquePaths(m, n, row, col + 1, memo);
  memo[key] = ways;
  return memo[key];
};

console.log(uniquePaths(3, 7));
