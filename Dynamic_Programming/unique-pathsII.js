/*
You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

Input: obstacleGrid = [[0,1],[0,0]]
Output: 1

 */

// Approach: 2D DP with Tabulation
// O(n * m) time | O(1) space
const uniquePathsWithObstacles = (obstacleGrid) => {
  // if start position is an obstacle return 0;
  if (obstacleGrid[0][0]) return 0;
  // set first position to 1
  obstacleGrid[0][0] = 1;
  // update the first row
  for (let col = 1; col < obstacleGrid[0].length; col++) {
    obstacleGrid[0][col] =
      obstacleGrid[0][col - 1] === 1 && obstacleGrid[0][col] === 0 ? 1 : 0;
  }
  // update the first col
  for (let row = 1; row < obstacleGrid.length; row++) {
    obstacleGrid[row][0] =
      obstacleGrid[row - 1][0] === 1 && obstacleGrid[row][0] === 0 ? 1 : 0;
  }
  for (let row = 1; row < obstacleGrid.length; row++) {
    for (let col = 1; col < obstacleGrid[0].length; col++) {
      if (obstacleGrid[row][col]) {
        obstacleGrid[row][col] = 0;
      } else {
        obstacleGrid[row][col] =
          obstacleGrid[row - 1][col] + obstacleGrid[row][col - 1];
      }
    }
  }
  return obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1];
};

// Approach: DP with Recursion
// O(n * m) time | O(n * m) space where n is the number of rows and m is the number of columns
const uniquePathsWithObstacles2 = (obstacleGrid) => {
  return dfs(obstacleGrid, 0, 0, {});
};

const dfs = (grid, row, col, memo) => {
  // if out of bounds, return 0
  if (row >= grid.length || col >= grid[0].length) return 0;
  // if you hit obstacle, return 0
  if (grid[row][col]) return 0;
  const key = row + ',' + col;
  if (key in memo) return memo[key];
  // if reached bottom right of grid, return 1
  if (row === grid.length - 1 && col === grid[0].length - 1) return 1;
  // declare total ways variable
  let totalWays = 0;
  totalWays += dfs(grid, row + 1, col, memo);
  totalWays += dfs(grid, row, col + 1, memo);
  memo[key] = totalWays;
  return memo[key];
};
