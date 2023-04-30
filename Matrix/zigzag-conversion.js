/**
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"
 */

const convert = (s, numRows) => {
  if (numRows == 1) {
    return s;
  }

  let n = s.length;
  let sections = Math.ceil(n / (2 * numRows - 2.0));
  let numCols = sections * (numRows - 1);

  let matrix = new Array(numRows)
    .fill(0)
    .map(() => new Array(numCols).fill(' '));

  let currRow = 0,
    currCol = 0;
  let currStringIndex = 0;

  // Iterate in zig-zag pattern on matrix and fill it with string characters.
  while (currStringIndex < n) {
    // Move down.
    while (currRow < numRows && currStringIndex < n) {
      matrix[currRow][currCol] = s[currStringIndex];
      currRow++;
      currStringIndex++;
    }

    currRow -= 2;
    currCol++;

    // Move up (with moving right also).
    while (currRow > 0 && currCol < numCols && currStringIndex < n) {
      matrix[currRow][currCol] = s[currStringIndex];
      currRow--;
      currCol++;
      currStringIndex++;
    }
  }

  let answer = matrix.map((row) => row.join('')).join('');
  return answer.replaceAll(' ', '');
};
