/* 
Input: grid = [[1,1],[3,4]]
Output: 8
Explanation: The strictly increasing paths are:
- Paths with length 1: [1], [1], [3], [4].
- Paths with length 2: [1 -> 3], [1 -> 4], [3 -> 4].
- Paths with length 3: [1 -> 3 -> 4].
The total number of paths is 4 + 3 + 1 = 8.

Input: grid = [[1],[2]]
Output: 3
Explanation: The strictly increasing paths are:
- Paths with length 1: [1], [2].
- Paths with length 2: [1 -> 2].
The total number of paths is 2 + 1 = 3.
*/

// O(m * n) time | O(m * n) space
const countPaths = (grid) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  // dp 2D wher at each (i, j) is the number of valid paths that end there
  const dp = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(0));
  let MOD = Math.pow(10, 9) + 7;
  // dfs
  const dfs = (row, col) => {
    // if in cache return
    if (dp[row][col] !== 0) return dp[row][col];
    let size = 1;
    // go through position
    for (let [rD, cD] of deltas) {
      const nR = row + rD;
      const nC = col + cD;
      if (
        nR >= 0 &&
        nR < grid.length &&
        nC >= 0 &&
        nC < grid[0].length &&
        grid[nR][nC] < grid[row][col]
      ) {
        size = (size + dfs(nR, nC)) % MOD;
      }
    }

    dp[row][col] = size;
    return size;
  };
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      count = (count + dfs(row, col)) % MOD;
    }
  }
  return count;
};

const grid = [[1], [2]];

console.log(countPaths(grid));
