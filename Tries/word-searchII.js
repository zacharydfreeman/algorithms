/* 
Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []

*/

// O(m*n*3^l) time | O(m*n) where m is the number of rows, n is number of columsn and l is the length of the longest word
const findWords = (board, words) => {
  // create Trie data structure
  const trie = new Trie();
  for (let word of words) {
    trie.add(word);
  }
  // declare output
  const output = new Set();
  const visited = new Set();
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      dfs(board, row, col, trie.root, '', output, visited);
    }
  }
  // return output
  return Array.from(output);
};

const dfs = (board, row, col, root, currStr, output, visited) => {
  // check if out of bounds
  const rowInBounds = 0 <= row && row < board.length;
  const colInBounds = 0 <= col && col < board[0].length;
  if (!rowInBounds || !colInBounds) return;
  const pos = row + ',' + col;
  const char = board[row][col];
  if (!(char in root) || visited.has(pos)) return;
  visited.add(pos);
  currStr += char;
  root = root[char];
  if ('*' in root) output.add(currStr);
  dfs(board, row + 1, col, root, currStr, output, visited);
  dfs(board, row - 1, col, root, currStr, output, visited);
  dfs(board, row, col + 1, root, currStr, output, visited);
  dfs(board, row, col - 1, root, currStr, output, visited);

  visited.delete(pos);
};

class Trie {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  add(word) {
    let current = this.root;
    for (let char of word) {
      if (!(char in current)) current[char] = {};
      current = current[char];
    }
    current[this.endSymbol] = true;
  }
}
