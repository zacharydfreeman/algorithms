/*
You are given an m x n binary matrix grid. An island is a group of 1's (representing land)
connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid
are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.


 */

// Approach: Traverse graph and perform DFS
// O(r * c) time | O(r * c) space where r is the # of rows and c is # of columns
const maxAreaOfIsland = (grid) => {
  // declare visited set and maxSize variable
  const visited = new Set();
  let maxSize = -Infinity;
  // traverse graph
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (!grid[row][col]) continue;
      // call recursive dfs helper function
      const size = exploreSize(grid, row, col, visited);
      maxSize = Math.max(maxSize, size);
    }
  }
  return maxSize === -Infinity ? 0 : maxSize;
};

const exploreSize = (grid, row, col, visited) => {
  // check if in bounds
  const rowInBounds = 0 <= row && row < grid.length;
  const colInBounds = 0 <= col && col < grid[0].length;
  if (!rowInBounds || !colInBounds) return 0;
  // check if in visited or a 0
  const pos = row + ',' + col;
  if (visited.has(pos) || !grid[row][col]) return 0;
  visited.add(pos);
  // explore and add to size
  let size = 1;

  size += exploreSize(grid, row + 1, col, visited);
  size += exploreSize(grid, row - 1, col, visited);
  size += exploreSize(grid, row, col + 1, visited);
  size += exploreSize(grid, row, col - 1, visited);

  return size;
};
