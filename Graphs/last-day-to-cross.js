/* 
There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.

Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).

You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).

Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
Output: 2
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 2.

Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
Output: 1
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 1.

Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
Output: 3
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 3.


*/

// Approach: Binary Search w/ BFS
// O(m * n * log(m * n)) time | O(m * n) space where m is the number of rows and c is the number of columns
const latestDayToCross = (row, col, cells) => {
  let l = 1;
  let r = cells.length;
  let ans = 0;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (canCross(row, col, cells, mid)) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return ans;
};

const canCross = (row, col, cells, day) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  // initialize grid
  const grid = new Array(row).fill().map(() => new Array(col).fill(0));
  for (let i = 0; i < day; i++) {
    const [row, col] = cells[i];
    grid[row - 1][col - 1] = 1;
  }
  // initialize queue
  let queue = [];
  for (let c = 0; c < col; c++) {
    // add to queue and mark visited
    if (grid[0][c] === 0) {
      grid[0][c] = -1;
      queue.push([0, c]);
    }
  }
  while (queue.length) {
    const nextLevel = [];
    for (let [cR, cC] of queue) {
      // check if reached end
      if (cR === grid.length - 1) return true;
      // explore neighbors
      for (let [rD, cD] of deltas) {
        const nR = cR + rD;
        const nC = cC + cD;
        const rowInBounds = 0 <= nR && nR < grid.length;
        const colInBounds = 0 <= nC && nC < grid[0].length;
        if (
          rowInBounds &&
          colInBounds &&
          grid[nR][nC] !== -1 &&
          grid[nR][nC] !== 1
        ) {
          // mark as visited
          grid[nR][nC] = -1;
          nextLevel.push([nR, nC]);
        }
      }
    }
    queue = nextLevel;
  }
  return false;
};
