/*
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
DO NOT allocate another 2D matrix and do the rotation.

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

 */
// O(n^2) time | O(1) space
const rotate = (matrix) => {
  // declare left and right pointers
  let l = 0;
  let r = matrix[0].length - 1;
  // while l < r
  while (l < r) {
    // declare top and bottom pointers
    let t = l;
    let b = r;
    // loop through columns
    for (let i = 0; i < r - l; i++) {
      // grab top left value
      const topLeftVal = matrix[t][l + i];
      // move bottom left into top right
      matrix[t][l + i] = matrix[b - i][l];
      //move bottom right into bottom left
      matrix[b - i][l] = matrix[b][r - i];
      //move top right into bottom right
      matrix[b][r - i] = matrix[t + i][r];
      //move top left value into top right
      matrix[t + i][r] = topLeftVal;
    }
    // update pointers
    l++;
    r--;
  }
};
