/**
 * You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).

The rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.

Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
 */

// Approach: Choose closet neighbors each time. We could optimize using a heap and optimal time complexity would be O(n^2log(n))
// O(n^3log(n)) time | O(n^2) space
const swimInWater = (grid) => {
  // declare open and visited set
  const openSet = [[0, 0]];
  const visited = new Set([0 + ',' + 0]);
  let min = -Infinity;
  while (openSet.length) {
    // sort
    openSet.sort((a, b) => grid[b[0]][b[1]] - grid[a[0]][a[1]]);
    // get current node
    const [currentRow, currentCol] = openSet.pop();
    // min logic
    min = Math.max(min, grid[currentRow][currentCol]);
    // if at the end, return min
    if (currentRow === grid.length - 1 && currentCol === grid[0].length - 1)
      return min;
    // explore neighbors
    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let [row, col] of deltas) {
      const newRow = row + currentRow;
      const newCol = col + currentCol;
      const rowInBounds = 0 <= newRow && newRow < grid.length;
      const colInBounds = 0 <= newCol && newCol < grid[0].length;
      const pos = newRow + ',' + newCol;
      if (rowInBounds && colInBounds && !visited.has(pos)) {
        // add to open and visited set
        visited.add(pos);
        openSet.push([newRow, newCol]);
      }
    }
  }
};
