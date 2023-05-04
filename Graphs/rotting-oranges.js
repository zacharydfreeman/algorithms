/*
You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

*/

// Approach: Multi-directional BFS
// O(n * m) time | O(n * m) space
const orangesRotting = (grid) => {
  // initialize queue with all 2 positions
  let queue = [];
  let freshOranges = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 2) queue.push([row, col]);
      if (grid[row][col] === 1) freshOranges++;
    }
  }

  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let time = 0;
  while (queue.length) {
    const newLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [currentRow, currentCol] = queue[i];
      for (let [rowDelta, colDelta] of deltas) {
        const newRow = rowDelta + currentRow;
        const newCol = colDelta + currentCol;
        const rowInBounds = 0 <= newRow && newRow < grid.length;
        const colInBounds = 0 <= newCol && newCol < grid[0].length;
        if (rowInBounds && colInBounds && grid[newRow][newCol] === 1) {
          // flip cell to 0
          grid[newRow][newCol] = 2;
          freshOranges--;
          newLevel.push([newRow, newCol]);
        }
      }
    }
    queue = newLevel;
    if (queue.length) time++;
  }
  return freshOranges === 0 ? time : -1;
};
