/**
 * Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.


 */

// Approach: DFS-like solution. Mark each node as 1 as you visit
// O(r * c) time | O(r * c) space where r is number of row and c is numbers of columns
const closedIsland = (grid) => {
  // declare output variable
  let numOfClosedIslands = 0;
  // traverse graph
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // if you encounter a 0, do dfs
      if (!grid[row][col]) {
        numOfClosedIslands += dfs(grid, row, col);
      }
    }
  }
  return numOfClosedIslands;
};

const dfs = (grid, row, col) => {
  const rowInBounds = 0 <= row && row < grid.length;
  const colInBounds = 0 <= col && col < grid[0].length;
  // if you are out of bounds return 0
  if (!rowInBounds || !colInBounds) return 0;
  // if you hit a 1 return 1
  if (grid[row][col]) return 1;
  // mark position as 1 so you dont visit it again
  grid[row][col] = 1;
  // go right, left, up and down
  const goRight = dfs(grid, row + 1, col);
  const goLeft = dfs(grid, row - 1, col);
  const goUp = dfs(grid, row, col + 1);
  const goDown = dfs(grid, row, col - 1);
  // if all are 1 return 1
  if (goRight && goLeft && goUp && goDown) return 1;
  // otherwise return 0
  return 0;
};
