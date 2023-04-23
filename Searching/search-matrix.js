/**
 * You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.
 */
// Approach: Modified binary search.
// O(n + m) time | O(1) space
const searchMatrix = (matrix, target) => {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    const num = matrix[row][col];
    if (num === target) return true;
    if (num < target) {
      row++;
    } else {
      col--;
    }
  }
  return false;
};

// Approach: Treat matrix as one big array and perform binary search
// O(log(n*m)) time | O(1) space
const searchMatrix2 = (matrix, target) => {
  const ROWS = matrix.length;
  if (ROWS === 0) return false;
  const COLS = matrix[0].length;
  let l = 0;
  let r = ROWS * COLS - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let row = Math.floor(mid / COLS);
    let col = mid % COLS;
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return false;
};
