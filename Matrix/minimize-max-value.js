/*
You are given an m x n integer matrix grid containing distinct positive integers.

You have to replace each integer in the matrix with a positive integer satisfying the following conditions:

The relative order of every two elements that are in the same row or column should stay the same after the replacements.
The maximum number in the matrix after the replacements should be as small as possible.
The relative order stays the same if for all pairs of elements in the original matrix such that grid[r1][c1] > grid[r2][c2] where either r1 == r2 or c1 == c2, then it must be true that grid[r1][c1] > grid[r2][c2] after the replacements.

For example, if grid = [[2, 4, 5], [7, 3, 9]] then a good replacement could be either grid = [[1, 2, 3], [2, 1, 4]] or grid = [[1, 2, 3], [3, 1, 4]].

Return the resulting matrix. If there are multiple answers, return any of them.

Input: grid = [[3,1],[2,5]]
Output: [[2,1],[1,2]]
Explanation: The above diagram shows a valid replacement.
The maximum number in the matrix is 2. It can be shown that no smaller value can be obtained.

Input: grid = [[10]]
Output: [[1]]
Explanation: We replace the only number in the matrix with 1.
*/

// O(m*n*log(m*n)) time | O(m*n) space
const minScore = (grid) => {
  // place numbers and positions in stack
  const stack = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      stack.push([grid[row][col], row, col]);
    }
  }
  // sort the stack. You want to place the lowest value first
  stack.sort((a, b) => b[0] - a[0]);
  // keep track of the max num in the current row and col
  const rowMaxs = new Array(grid.length).fill(0);
  const colMaxs = new Array(grid[0].length).fill(0);

  while (stack.length) {
    const [val, row, col] = stack.pop();
    // grid[row][col] will be the max of row and col + 1
    grid[row][col] = Math.max(rowMaxs[row], colMaxs[col]) + 1;
    // update row and col max
    rowMaxs[row] = grid[row][col];
    colMaxs[col] = grid[row][col];
  }

  return grid;
};

const minScore2 = (grid) => {
  // place numbers and positions in stack
  const stack = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      stack.push([grid[row][col], row, col]);
    }
  }
  // sort the stack. You want to place the lowest value first
  stack.sort((a, b) => b[0] - a[0]);

  while (stack.length) {
    // declare temp variable
    let temp = -1;
    const [val, row, col] = stack.pop();

    // go down
    for (let i = row + 1; i < grid.length; i++) {
      if (grid[i][col] < val) {
        temp = Math.max(temp, grid[i][col]);
      }
    }
    // go up
    for (let i = row - 1; i >= 0; i--) {
      if (grid[i][col] < val) {
        temp = Math.max(temp, grid[i][col]);
      }
    }
    // go right
    for (let i = col + 1; i < grid[0].length; i++) {
      if (grid[row][i] < val) {
        temp = Math.max(temp, grid[row][i]);
      }
    }
    // go left
    for (let i = col - 1; i >= 0; i--) {
      if (grid[row][i] < val) {
        temp = Math.max(temp, grid[row][i]);
      }
    }

    if (temp === -1) {
      grid[row][col] = 1;
    } else {
      grid[row][col] = temp + 1;
    }
  }

  return grid;
};
