/* 
Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

*/

const setZeroes = (matrix) => {
  // mark all zeroes with "as"
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 0) matrix[r][c] = 'a';
    }
  }
  // find all a's and change entire row and column to zero
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 'a') {
        // change entire column to 0
        for (let row = 0; row < matrix.length; row++) {
          if (matrix[row][c] !== 'a') matrix[row][c] = 0;
        }
        // change entire row
        for (let col = 0; col < matrix[0].length; col++) {
          if (matrix[r][col] !== 'a') matrix[r][col] = 0;
        }
      }
    }
  }
  // change all a's to 0s
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 'a') matrix[r][c] = 0;
    }
  }

  return matrix;
};
