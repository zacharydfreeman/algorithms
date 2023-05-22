/* 
You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:

0 represents an empty cell,
1 represents an obstacle that may be removed.
You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.

Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.

*/

// Approach: Unoptimieed Dijkstras
const minimumObstacles = (grid) => {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const distances = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(Infinity));
  // initialize the starting position
  distances[0][0] = 0;
  let queue = [[0, 0]]; // [row, col, distance]
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [row, col] = queue[i];
      let distance = distances[row][col];
      for (let [rD, cD] of directions) {
        const newRow = row + rD;
        const newCol = col + cD;
        const rowInBounds = 0 <= newRow && newRow < grid.length;
        const colInBounds = 0 <= newCol && newCol < grid[0].length;
        if (!rowInBounds || !colInBounds) continue;
        // get current distance at the new position
        let newDistance = distance + grid[newRow][newCol];
        if (newDistance < distances[newRow][newCol]) {
          distances[newRow][newCol] = newDistance;
          nextLevel.push([newRow, newCol]);
        }
      }
    }
    queue = nextLevel;
  }

  return distances[distances.length - 1][distances[0].length - 1];
};

// Approach: Optimized BFS (will timeout)
// O(m * n * o) time | O(m * n * o) with m is number of rows, n is number of columns and o is number of ones
const minimumObstacles2 = (grid) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let onesAvailable = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) onesAvailable++;
    }
  }

  const visited = new Set([0 + ',' + 0 + ',' + 0]);
  let queue = [[0, 0, onesAvailable]];
  let maxObstaclesAvailable = -Infinity;
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [row, col, obstacles] = queue[i];
      if (row === grid.length - 1 && col === grid[0].length - 1) {
        maxObstaclesAvailable = Math.max(maxObstaclesAvailable, obstacles);
        continue;
      }
      for (let [rD, cD] of deltas) {
        const nR = row + rD;
        const nC = col + cD;
        const rowInBounds = 0 <= nR && nR < grid.length;
        const colInBounds = 0 <= nC && nC < grid[0].length;
        const pos = nR + ',' + nC + ',' + obstacles;
        if (rowInBounds && colInBounds && !visited.has(pos)) {
          visited.add(pos);
          if (grid[nR][nC] && obstacles > 0) {
            nextLevel.push([nR, nC, obstacles - 1]);
          } else {
            nextLevel.push([nR, nC, obstacles]);
          }
        }
      }
    }
    queue = nextLevel;
  }
  return onesAvailable - maxObstaclesAvailable;
};
