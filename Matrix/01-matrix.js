/* 
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]

Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
*/

// Approach: BFS
// O(n * m) time | O(n * m) space
const updateMatrix = (mat) => {
  let queue = [];
  const visited = new Set();
  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (mat[row][col] === 0) {
        const pos = row + ',' + col;
        visited.add(pos);
        queue.push([row, col, 0]);
      }
    }
  }
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (queue.length) {
    const nextLevel = [];
    for (let [row, col, distance] of queue) {
      if (mat[row][col] === 1) {
        mat[row][col] = distance;
      }
      for (let [rD, cD] of deltas) {
        const newRow = row + rD;
        const newCol = col + cD;
        const rowInBounds = 0 <= newRow && newRow < mat.length;
        const colInBounds = 0 <= newCol && newCol < mat[0].length;
        const pos = newRow + ',' + newCol;
        if (
          rowInBounds &&
          colInBounds &&
          !visited.has(pos) &&
          mat[newRow][newCol] === 1
        ) {
          visited.add(pos);
          nextLevel.push([newRow, newCol, distance + 1]);
        }
      }
      queue = nextLevel;
    }
  }
  return mat;
};
