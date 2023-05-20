/*
You are given a 0-indexed m x n binary matrix grid. You can move from a cell (row, col) to any of the cells (row + 1, col) or (row, col + 1).

Return true if there is a path from (0, 0) to (m - 1, n - 1) that visits an equal number of 0's and 1's. Otherwise return false.

Input: grid = [[0,1,0,0],[0,1,0,0],[1,0,1,0]]
Output: true
Explanation: The path colored in blue in the above diagram is a valid path because we have 3 cells with a value of 1 and 3 with a value of 0. Since there is a valid path, we return true.

Input: grid = [[1,1,0],[0,0,1],[1,0,0]]
Output: false
Explanation: There is no path in this grid with an equal number of 0's and 1's.

*/

const isThereAPath = (grid) => {
  const visited = new Set();
  const deltas = [
    [1, 0],
    [0, 1],
  ];
  let queue = [[0, 0, 1, grid[0][0]]]; // [row, col, number of cells, number of ones]
  while (queue.length) {
    let nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [row, col, cells, numOnes] = queue[i];
      if (
        row === grid.length - 1 &&
        col === grid[0].length - 1 &&
        numOnes / cells === 0.5
      )
        return true;
      for (let [rowDelta, colDelta] of deltas) {
        const newRow = row + rowDelta;
        const newCol = col + colDelta;
        if (newRow < grid.length && newCol < grid[0].length) {
          const newNumOnes = numOnes + grid[newRow][newCol];
          const pos = row + ',' + col + newNumOnes;
          if (!visited.has(pos)) {
            visited.add(pos);
            nextLevel.push([newRow, newCol, cells + 1, newNumOnes]);
          }
        }
      }
    }
    queue = nextLevel;
  }
  return false;
};
