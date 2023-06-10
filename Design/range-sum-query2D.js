/* 
Given a 2D matrix matrix, handle multiple queries of the following type:

Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
Implement the NumMatrix class:

NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
You must design an algorithm where sumRegion works on O(1) time complexity.

Input
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output
[null, 8, 11, 12]

Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)


[3, 0, 1, 4, 2], 
[5, 6, 3, 2, 1], 
[1, 2, 0, 1, 5], 
[4, 1, 0, 1, 7], 
[1, 0, 3, 0, 5]

[3, 3,   4,  8, 10]
[8, 14, 18, 24, 27]
[9, 17, 21,  XX4,  9]
[4, 5,   5,  6, 13]
[1, 1,   4,  4,  9]
*/

class NumMatrix {
  constructor(matrix) {
    this.matrixSums = new Array(matrix.length)
      .fill()
      .map(() => new Array(matrix[0].length).fill(0));
    let total = 0;
    for (let col = 0; col < matrix[0].length; col++) {
      total += matrix[0][col];
      this.matrixSums[0][col] = total;
    }
    total = 0;
    for (let row = 0; row < this.matrixSums.length; row++) {
      total += matrix[row][0];
      this.matrixSums[row][0] = total;
    }

    for (let row = 1; row < this.matrixSums.length; row++) {
      for (let col = 1; col < this.matrixSums[0].length; col++) {
        this.matrixSums[row][col] =
          this.matrixSums[row - 1][col] +
          this.matrixSums[row][col - 1] +
          matrix[row][col] -
          this.matrixSums[row - 1][col - 1];
      }
    }
  }

  sumRegion(row1, col1, row2, col2) {
    const largeSquare = this.matrixSums[row2][col2];
    const squareAbove = row1 > 0 ? this.matrixSums[row1 - 1][col2] : 0;
    const squareLeft = col1 > 0 ? this.matrixSums[row2][col1 - 1] : 0;
    const topLeft =
      row1 > 0 && col1 > 0 ? this.matrixSums[row1 - 1][col1 - 1] : 0;

    return largeSquare - squareAbove - squareLeft + topLeft;
  }
}
