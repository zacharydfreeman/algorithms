/* 
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Input: grid = [[1,2,3],[4,5,6]]
Output: 12

*/

// Approach: 2-D Dynamic Programming
// O(n * m) time | O(n * m) space
const minPathSum = (grid, row = 0, col = 0, memo = {}) => {
  const pos = row + ',' + col;
  if (pos in memo) return memo[pos];
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length)
    return Infinity;
  if (row === grid.length - 1 && col === grid[0].length - 1)
    return grid[row][col];

  const down = minPathSum(grid, row + 1, col, memo);
  const right = minPathSum(grid, row, col + 1, memo);

  memo[pos] = grid[row][col] + Math.min(down, right);
  return memo[pos];
};
