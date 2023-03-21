/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Input: board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
 */

// O(1) time | O(1) space
const isValidSudoku = (board) => {
  // check every position that is not a period
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] !== '.') {
        if (!isValid(row, col, board)) return false;
      }
    }
  }
  return true;
};

const isValid = (row, col, board) => {
  // grab current number
  const num = board[row][col];
  // check if row is valid
  for (let c = 0; c < board[0].length; c++) {
    if (c === col) continue;
    if (board[row][c] === num) return false;
  }
  // check is column is valid
  for (let r = 0; r < board.length; r++) {
    if (r === row) continue;
    if (board[r][col] === num) return false;
  }
  // check subsquare
  const rowStart = Math.floor(row / 3);
  const colStart = Math.floor(col / 3);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const currentRow = rowStart * 3 + r;
      const currentCol = colStart * 3 + c;
      if (currentRow === row && currentCol === col) continue;
      if (board[currentRow][currentCol] === num) return false;
    }
  }

  return true;
};
