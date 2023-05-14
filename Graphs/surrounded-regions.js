/* 
Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.

*/

// O(r * c) time | O(r * c) space where r is the number of rows and c is the numbers of columns
const solve = (board) => {
  const borders = new Set();
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === board.length - 1 ||
        col === board[0].length - 1
      ) {
        dfs(row, col, board, borders);
      }
    }
  }
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const pos = row + ',' + col;
      if (board[row][col] === 'O' && !borders.has(pos)) board[row][col] = 'X';
    }
  }
  return board;
};

const dfs = (row, col, board, borders) => {
  const rowInBounds = 0 <= row && row < board.length;
  const colInBounds = 0 <= col && col < board[0].length;
  if (!rowInBounds || !colInBounds) return;
  const pos = row + ',' + col;
  if (borders.has(pos) || board[row][col] === 'X') return;
  borders.add(pos);

  dfs(row + 1, col, board, borders);
  dfs(row - 1, col, board, borders);
  dfs(row, col + 1, board, borders);
  dfs(row, col - 1, board, borders);

  return;
};
