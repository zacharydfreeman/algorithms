/*
You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.

Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
Output: 6
Explanation: 
The shortest path without eliminating any obstacle is 10.
The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).

Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
Output: -1
Explanation: We need to eliminate at least two obstacles to find such a walk.

 */

// O(m * n * k) time | O(m * n * k) space
const shortestPath = (grid, k) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Set();
  let queue = [[0, 0, 0, k]];
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [r, c, distance, moves] = queue[i];
      if (r === grid.length - 1 && c === grid[0].length - 1) return distance;
      for (let [rD, cD] of deltas) {
        const nR = r + rD;
        const nC = c + cD;
        const rowInBounds = 0 <= nR && nR < grid.length;
        const colInBounds = 0 <= nC && nC < grid[0].length;
        const pos = nR + ',' + nC + "," + moves;
        if (rowInBounds && colInBounds && !visited.has(pos)) {
          if (grid[nR][nC] === 0) {
            visited.add(pos);
            nextLevel.push([nR, nC, distance + 1, moves]);
          } else if (grid[nR][nC] === 1 && moves > 0) {
            visited.add(pos);
            nextLevel.push([nR, nC, distance + 1, moves - 1]);
          }
        }
      }
    }
    queue = nextLevel;
  }
  return -1;
};

