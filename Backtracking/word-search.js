/*

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
 */

const exist = (board, word) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (word[0] === board[row][col]) {
        if (dfs(board, row, col, word, 0)) return true;
      }
    }
  }
  return false;
};

const dfs = (board, row, col, word, idx) => {
  if (word.length === idx) return true;
  const rowInBounds = 0 <= row && row < board.length;
  const colInBounds = 0 <= col && col < board[0].length;

  if (!rowInBounds || !colInBounds) return false;
  const char = board[row][col];

  if (word[idx] !== char) return false;
  board[row][col] = '*';
  const result =
    dfs(board, row + 1, col, word, idx + 1) ||
    dfs(board, row - 1, col, word, idx + 1) ||
    dfs(board, row, col + 1, word, idx + 1) ||
    dfs(board, row, col - 1, word, idx + 1);
  board[row][col] = char;
  return result;
};
