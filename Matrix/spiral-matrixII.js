/**
 * Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.
 */

// O(n^2) time | O(n^2) space
const generateMatrix = (n) => {
  const output = Array.from(Array(n), () => Array(n));

  let startRow = 0;
  let endRow = n - 1;
  let startCol = 0;
  let endCol = n - 1;
  let currentNum = 1;
  while (startRow <= endRow && startCol <= endCol) {
    for (let col = startCol; col <= endCol; col++) {
      output[startRow][col] = currentNum;
      currentNum++;
    }
    startRow++;

    for (let row = startRow; row <= endRow; row++) {
      output[row][endCol] = currentNum;
      currentNum++;
    }

    endCol--;

    for (let col = endCol; col >= startCol; col--) {
      output[endRow][col] = currentNum;
      currentNum++;
    }

    endRow--;
    for (let row = endRow; row >= startRow; row--) {
      output[row][startCol] = currentNum;
      currentNum++;
    }

    startCol++;
  }

  return output;
};
