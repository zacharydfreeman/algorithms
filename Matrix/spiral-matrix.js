/**
 Given an m x n matrix, return all elements of the matrix in spiral order.
 
 Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 */

// O(r * c) time | O(r * c) space where r is the number of row and c is the number of columns
const spiralOrder = (matrix) => {
  // initialize pointers
  let startRow = 0;
  let endingRow = matrix.length - 1;
  let startCol = 0;
  let endingCol = matrix[0].length - 1;
  // declare output variable
  const output = [];
  while (startRow <= endingRow && startCol <= endingCol) {
    // go right
    for (let col = startCol; col <= endingCol; col++) {
      output.push(matrix[startRow][col]);
    }
    // update start Row pointer
    startRow++;
    // go down
    for (let row = startRow; row <= endingRow; row++) {
      output.push(matrix[row][endingCol]);
    }
    // update ending Col pointer
    endingCol--;
    // go left
    for (let col = endingCol; col >= startCol; col--) {
      if (startRow - 1 === endingRow) break;
      output.push(matrix[endingRow][col]);
    }
    // update ending row pointer
    endingRow--;
    // go up
    for (let row = endingRow; row >= startRow; row--) {
      if (endingCol + 1 === startCol) break;
      output.push(matrix[row][startCol]);
    }
    // update starting col
    startCol++;
  }
  return output;
};
