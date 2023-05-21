/* 
You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.

You may change 0's to 1's to connect the two islands to form one island.

Return the smallest number of 0's you must flip to connect the two islands.

Input: grid = [[0,1],[1,0]]
Output: 1

Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2


*/

// O(n^2) time | O(n^2) space
const shortestBridge = (grid) => {
  const visited = new Set();
  let queue = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] && queue.length === 0) {
        dfs(grid, r, c, visited, queue);
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
    for (let i = 0; i < queue.length; i++) {
      const [r, c, distance] = queue[i];
      if (grid[r][c] === 1 && distance > 0) return distance - 1;
      for (let [rowDelta, colDelta] of deltas) {
        const newRow = r + rowDelta;
        const newCol = c + colDelta;
        const rowInBounds = 0 <= newRow && newRow < grid.length;
        const colInBounds = 0 <= newCol && newCol < grid[0].length;
        const pos = newRow + ',' + newCol;
        if (!rowInBounds || !colInBounds || visited.has(pos)) continue;
        visited.add(pos);
        nextLevel.push([newRow, newCol, distance + 1]);
      }
    }
    queue = nextLevel;
  }
};

const dfs = (grid, r, c, visited, queue) => {
  const rowInBounds = 0 <= r && r < grid.length;
  const colInBounds = 0 <= c && c < grid[0].length;
  if (!rowInBounds || !colInBounds || grid[r][c] === 0) return;
  const pos = r + ',' + c;
  if (visited.has(pos)) return;
  queue.push([r, c, 0]);
  visited.add(pos);

  dfs(grid, r + 1, c, visited, queue);
  dfs(grid, r - 1, c, visited, queue);
  dfs(grid, r, c + 1, visited, queue);
  dfs(grid, r, c - 1, visited, queue);

  return;
};
