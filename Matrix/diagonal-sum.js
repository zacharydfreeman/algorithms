/**
 * Given a square matrix mat, return the sum of the matrix diagonals.

Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.


 */

// O(n^2) time | O(1) space
const diagonalSum = (mat) => {
  let sum = 0;
  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (row === col) {
        sum += mat[row][col];
        continue;
      }
      if (row + col === mat.length - 1) sum += mat[row][col];
    }
  }
  return sum;
};
