/*
Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.

Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.

Input: grid = [[3,2],[1,0]]
Output: 0

*/

// O(m + n) time | O(1) space
const countNegatives = (grid) => {
  let count = 0;
  let n = grid[0].length;
  let currRowNegativeIndex = n - 1;

  // Iterate on all rows of the matrix one by one.
  for (let row of grid) {
    // Decrease 'currRowNegativeIndex' so that it points to current row's last positive element.
    while (currRowNegativeIndex >= 0 && row[currRowNegativeIndex] < 0) {
      currRowNegativeIndex--;
    }
    // 'currRowNegativeIndex' points to the last positive element,
    // which means 'n - (currRowNegativeIndex + 1)' is the number of all negative elements.
    count += n - (currRowNegativeIndex + 1);
  }
  return count;
};

// O(m*log(n)) time | O(1) space
const countNegatives2 = (grid) => {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    let l = 0;
    let r = grid[0].length - 1;
    let idx = -1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      if (grid[row][mid] < 0) {
        idx = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    if (idx !== -1) count += grid[0].length - idx;
  }
  return count;
};

// O(m * n) time | O(1) space
const countNegatives3 = (grid) => {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] < 0) count++;
    }
  }
  return count;
};

const grid = [
  [1, -1],
  [-1, -1],
];
console.log(countNegatives(grid));
