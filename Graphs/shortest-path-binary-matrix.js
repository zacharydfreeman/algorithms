/* 
Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

Input: grid = [[0,1],[1,0]]
Output: 2

Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4

Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
*/

// Approach: BFS
// O(n * m) time | O(n * m) space where n is the number of rows and m is the number of columns
const shortestPathBinaryMatrix = (grid) => {
  if (grid[0][0]) return -1;
  // initialize queue and visited set with start position
  const visited = new Set([0 + ',' + 0]);
  const queue = [[0, 0, 1]]; // [row, col, num of nodes in path]
  while (queue.length) {
    // get current node
    const [currentRow, currentCol, numOfNodes] = queue.shift();
    if (currentRow === grid.length - 1 && currentCol === grid[0].length - 1)
      return numOfNodes;
    // explore neighbors
    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ];
    for (let [rowDelta, colDelta] of deltas) {
      const newRow = rowDelta + currentRow;
      const newCol = colDelta + currentCol;
      const rowInBounds = 0 <= newRow && newRow < grid.length;
      const colInBounds = 0 <= newCol && newCol < grid[0].length;
      const pos = newRow + ',' + newCol;
      if (
        rowInBounds &&
        colInBounds &&
        !visited.has(pos) &&
        grid[newRow][newCol] === 0
      ) {
        // add to queue and visited set
        visited.add(pos);
        queue.push([newRow, newCol, numOfNodes + 1]);
      }
    }
  }
  return -1;
};
