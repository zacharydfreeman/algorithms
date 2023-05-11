/* 
You are given an m x n integer array grid where grid[i][j] could be:

1 representing the starting square. There is exactly one starting square.
2 representing the ending square. There is exactly one ending square.
0 representing empty squares we can walk over.
-1 representing obstacles that we cannot walk over.
Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.

Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: We have the following two paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)

Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
Explanation: We have the following four paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)

Input: grid = [[0,1],[2,0]]
Output: 0
Explanation: There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.
*/

// Approach: Backtracking
// O(3^(r*c)) time | O(r*c) space where r is the number of rows and c is the number of columns
const uniquePathsIII = (grid) => {
  // we need to initialize the confitions for backtracking
  // i.e. initial state and final state
  let unvisitedCells = 0;
  let startRow;
  let startCol;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] >= 0) unvisitedCells++;
      if (grid[row][col] === 1) {
        startRow = row;
        startCol = col;
      }
    }
  }
  // declare total paths variable
  let totalPaths = 0;
  // define dfs backtrack
  const dfs = (row, col, unvisitedCells) => {
    // base cases => if out of bounds, if already visited or an obstacle, return
    const rowInBounds = 0 <= row && row < grid.length;
    const colInBounds = 0 <= col && col < grid[0].length;
    if (!rowInBounds || !colInBounds) return;
    // base cases => if already visited or an obstacle, return
    if (grid[row][col] < 0) return;
    // base cases => if we are at destination and 1 unvisited cell left
    if (grid[row][col] === 2 && unvisitedCells === 1) {
      totalPaths++;
      return;
    }
    // mark cell as visited with temp variable and decrement unvisitedCells
    const temp = grid[row][col];
    grid[row][col] = -3;
    unvisitedCells--;
    // explore 4 directions
    dfs(row + 1, col, unvisitedCells);
    dfs(row - 1, col, unvisitedCells);
    dfs(row, col + 1, unvisitedCells);
    dfs(row, col - 1, unvisitedCells);
    // backtrack
    grid[row][col] = temp;
  };
  dfs(startRow, startCol, unvisitedCells);
  return totalPaths;
};

const grid = [
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, -1],
];

console.log(uniquePathsIII(grid));
