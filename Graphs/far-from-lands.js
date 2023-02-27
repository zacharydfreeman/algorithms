/**
 * Given an n x n grid containing only values 0 and 1, where 0 represents water and 1 represents land,
 * find a water cell such that its distance to the nearest land cell is maximized, and return the distance.
 * If no land or water exists in the grid, return -1.
 * The distance used in this problem is the Manhattan distance: the distance between two cells (x0, y0) and (x1, y1) is |x0 - x1| + |y0 - y1|.
 *
 * Input: grid = [[1,0,1],[0,0,0],[1,0,1]] Output: 2 Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.
 *
 * [[1, 0, 1],
 *  [0, 0, 0],
 *  [1, 0, 1]]
 */

// Approach: Bidirectional BFS
// O(r * c) time | O(r * c) space
const maxDistance = (grid) => {
  // declare queue and visited set
  const visited = new Set();
  const queue = [];
  // put all 1's into queue
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) {
        const pos = row + ',' + col;
        visited.add(pos);
        queue.push([row, col, 0]);
      }
    }
  }

  // continue until you hit the last position and return distance
  while (queue.length) {
    const [currentRow, currentCol, currentDistance] = queue.shift();

    const positions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let position of positions) {
      const [rowChange, colChange] = position;
      const newRow = currentRow + rowChange;
      const newCol = currentCol + colChange;
      const rowInBounds = 0 <= newRow && newRow < grid.length;
      const colInBounds = 0 <= newCol && newCol < grid[0].length;
      const pos = newRow + ',' + newCol;

      if (rowInBounds && colInBounds && !visited.has(pos)) {
        visited.add(pos);
        queue.push([newRow, newCol, currentDistance + 1]);
      }
    }
    // If there are no more positions in queue, return the current distance or -1
    if (!queue.length) return currentDistance || -1;
  }

  return -1;
};

// Approach: Loop through whole grid, BFS
// O(r^2 * c^2) time | O(r * c) space
const maxDistance2 = (grid) => {
  // declare max distance
  let max = -Infinity;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (!grid[row][col]) {
        const currentDistance = bfs(grid, row, col, new Set());
        max = Math.max(max, currentDistance);
      }
    }
  }
  return max === -Infinity ? -1 : max;
};

const bfs = (grid, row, col, visited) => {
  // declare a queue
  const queue = [[row, col, 0]];
  while (queue.length) {
    // grab current position
    const [currentRow, currentCol, currentDistance] = queue.shift();
    if (grid[currentRow][currentCol]) return currentDistance;

    const positions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let position of positions) {
      const [rowChange, colChange] = position;
      const newRow = currentRow + rowChange;
      const newCol = currentCol + colChange;
      const rowInBounds = 0 <= newRow && newRow < grid.length;
      const colInBounds = 0 <= newCol && newCol < grid[0].length;
      const pos = newRow + ',' + newCol;

      if (rowInBounds && colInBounds && !visited.has(pos)) {
        visited.add(pos);
        queue.push([newRow, newCol, currentDistance + 1]);
      }
    }
  }
  return -Infinity;
};
