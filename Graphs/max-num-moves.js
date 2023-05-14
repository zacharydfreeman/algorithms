/**
 * You are given a 0-indexed m x n matrix grid consisting of positive integers.

You can start at any cell in the first column of the matrix, and traverse the grid in the following way:

From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, should be strictly bigger than the value of the current cell.
Return the maximum number of moves that you can perform.

Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
Output: 3
Explanation: We can start at the cell (0, 0) and make the following moves:
- (0, 0) -> (0, 1).
- (0, 1) -> (1, 2).
- (1, 2) -> (2, 3).
It can be shown that it is the maximum number of moves that can be made.

Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
Output: 0
Explanation: Starting from any cell in the first column we cannot perform any moves.
 */

// O(r * c) time | O(r * c) space where r is the number of rows and c is the numebr of columns
const maxMoves = (grid) => {
  // initialize queue with all cells in first column and visited set
  let queue = [];
  const visited = new Set();
  for (let r = 0; r < grid.length; r++) {
    const pos = r + ',' + 0;
    visited.add(pos);
    queue.push([r, 0, 0]);
  }
  let max = 0;
  // while queue has length
  while (queue.length) {
    // create new level
    const newLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [r, c, moves] = queue[i];
      max = Math.max(max, moves);
      const deltas = [
        [-1, 1],
        [0, 1],
        [1, 1],
      ];
      for (let [rC, cC] of deltas) {
        const newR = r + rC;
        const newC = c + cC;
        const rowInBounds = 0 <= newR && newR < grid.length;
        const colInBounds = 0 <= newC && newC < grid[0].length;
        const pos = newR + ',' + newC;
        if (
          rowInBounds &&
          colInBounds &&
          grid[newR][newC] > grid[r][c] &&
          !visited.has(pos)
        ) {
          newLevel.push([newR, newC, moves + 1]);
          visited.add(pos);
        }
      }
    }
    queue = newLevel;
  }
  return max;
};
