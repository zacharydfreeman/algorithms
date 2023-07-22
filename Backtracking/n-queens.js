/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such
that no two queens attack each other.

Given an integer n, Write a function that returns the number of non-attacking placements
of n queens
 */

// Approach: Backtracking
// O(n*n!) time | O(n)
const nonAttackingQueens = (n) => {
  // declare a variable that is an array of column positions for Q's in each row
  const colPositions = new Array(n).fill(0);
  return _getValidPositions(0, colPositions, n);
};

const _getValidPositions = (row, colPositions, n) => {
  // base cases
  if (row === n) return 1;
  // declare a placements variable
  let placements = 0;
  for (let col = 0; col < n; col++) {
    // recursice call ONLY if i placed a Q in a column that is in a valid position
    if (isValid(row, col, colPositions)) {
      // we need update colPositions becuase we places a Q in a valid spot
      colPositions[row] = col;
      // recursive call
      placements += _getValidPositions(row + 1, colPositions, n);
    }
  }
  return placements;
};

const isValid = (row, col, colPositions) => {
  // we need to loop through col positions but only up until the row we're at
  for (let i = 0; i < row; i++) {
    // check if col is possible
    const columnToCheck = colPositions[i]; // this tells where the queen is in row i
    const sameCol = columnToCheck === col;
    // if it is on diagonal
    const onDiagonal = Math.abs((columnToCheck - col) / (i - row)) === 1;
    if (sameCol || onDiagonal) return false;
  }

  return true;
};

const total = (n) => {
  let count = 0;
  const columns = new Array(n).fill(0);
  const diag1 = new Array(n).fill(0);
  const diag2 = new Array(n).fill(0);
  const dfs = (row) => {
    if (row === n) {
      count++;
      return;
    }
    for (let i = 0; i < n; i++) {
      if (columns[i] || diag1[i + row] || diag2[i - row + n - 1]) continue;
      columns[i] = diag1[i + row] = diag2[i - row + n - 1] = 1;
      dfs(row + 1);
      columns[i] = diag1[i + row] = diag2[i - row + n - 1] = 0;
    }
  };
  dfs(0);
  return count;
};

console.log(total(4));
