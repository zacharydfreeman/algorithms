/* 
Given an m x n picture consisting of black 'B' and white 'W' pixels, return the number of black lonely pixels.

A black lonely pixel is a character 'B' that located at a specific position where the same row and same column don't have any other black pixels.

Input: picture = [["W","W","B"],["W","B","W"],["B","W","W"]]
Output: 3
Explanation: All the three 'B's are black lonely pixels.

Input: picture = [["B","B","B"],["B","B","W"],["B","B","B"]]
Output: 0

*/

// O(m * n) time | O(m + n) space
const findLonelyPixel = (picture) => {
  const rows = new Array(picture.length).fill(0);
  const columns = new Array(picture[0].length).fill(0);
  for (let row = 0; row < picture.length; row++) {
    for (let col = 0; col < picture[0].length; col++) {
      if (picture[row][col] === 'B') {
        rows[row]++;
        columns[col]++;
      }
    }
  }
  let count = 0;
  for (let row = 0; row < picture.length; row++) {
    for (let col = 0; col < picture[0].length; col++) {
      if (picture[row][col] === 'B') {
        if (rows[row] === 1 && columns[col] === 1) count++;
      }
    }
  }
  return count;
};

const picture = [
  ['W', 'W', 'B'],
  ['W', 'B', 'W'],
  ['B', 'W', 'W'],
];
console.log(findLonelyPixel(picture));
