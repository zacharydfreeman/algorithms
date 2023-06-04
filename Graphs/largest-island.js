/* 
You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.

*/

// O(m * n) time | O(m * n) space
const largestIsland = (grid) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  // get components size and store in map
  const sizes = {};
  const visited = new Set();
  let max = 0;
  let islandName = 2;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        dfs(grid, row, col, visited, sizes, islandName);
        // update max now just in case there are no zeros in matrix
        max = Math.max(max, sizes[islandName]);
        islandName++;
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 0) {
        // check four directions
        const validPositions = new Set();
        for (let [rD, cD] of deltas) {
          const nR = row + rD;
          const nC = col + cD;
          const rowInBounds = 0 <= nR && nR < grid.length;
          const colInBounds = 0 <= nC && nC < grid[0].length;
          if (rowInBounds && colInBounds && grid[nR][nC] > 1)
            validPositions.add(grid[nR][nC]);
        }

        let size = 1;
        for (let name of validPositions) {
          size += sizes[name];
        }
        max = Math.max(max, size);
      }
    }
  }
  return max;
};

const dfs = (grid, row, col, visited, sizes, islandName) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let size = 0;
  const stack = [[row, col]];
  visited.add(row + ',' + col);
  while (stack.length) {
    const [row, col] = stack.pop();
    size++;
    grid[row][col] = islandName;
    for (let [rD, cD] of deltas) {
      const nR = row + rD;
      const nC = col + cD;
      const rowInBounds = 0 <= nR && nR < grid.length;
      const colInBounds = 0 <= nC && nC < grid[0].length;
      const pos = nR + ',' + nC;
      if (
        rowInBounds &&
        colInBounds &&
        !visited.has(pos) &&
        grid[nR][nC] === 1
      ) {
        visited.add(pos);
        stack.push([nR, nC]);
      }
    }
  }
  sizes[islandName] = size;
};

// Approach: For each one run dfs to get size
// O(m^2 * n^2) time | O(m * n) space
const largestIsland2 = (grid) => {
  let size = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        size = Math.max(size, _dfs(grid, row, col, new Set(), true));
      }
    }
  }

  return size;
};

const _dfs = (grid, row, col, visited, oneUsed) => {
  const rowInBounds = 0 <= row && row < grid.length;
  const colInBounds = 0 <= col && col < grid[0].length;
  if (!rowInBounds || !colInBounds) return 0;
  const key = row + ',' + col;
  if (visited.has(key) || (grid[row][col] === 1 && !oneUsed)) return 0;
  visited.add(key);
  oneUsed = false;
  let size = 1;

  size += _dfs(grid, row + 1, col, visited, oneUsed);
  size += _dfs(grid, row - 1, col, visited, oneUsed);
  size += _dfs(grid, row, col + 1, visited, oneUsed);
  size += _dfs(grid, row, col - 1, visited, oneUsed);

  return size;
};
