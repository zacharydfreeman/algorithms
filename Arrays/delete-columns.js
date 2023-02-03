/*
You are given an array of n strings strs, all of the same length.

The strings can be arranged such that there is one on each line, making a grid.
For example, strs = ["abc", "bce", "cae"] can be arranged as follows:
abc
bce
cae

You want to delete the columns that are not sorted lexicographically.
In the above example (0-indexed), columns 0 ('a', 'b', 'c') and 2 ('c', 'e', 'e') are sorted,
while column 1 ('b', 'c', 'a') is not, so you would delete column 1.

Return the number of columns that you will delete.

Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: The grid looks as follows:
  cba
  daf
  ghi
Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.

Input: strs = ["a","b"]
Output: 0
Explanation: The grid looks as follows:
  a
  b
Column 0 is the only column and is sorted, so you will not delete any columns.
*/

// O(n*m) time | O(1) space where n is length of the array and m is the length of the string
const minDeletionSize = (strs) => {
  // declare count variable
  let count = 0;
  // loop through strs starting with columns
  for (let col = 0; col < strs[0].length; col++) {
    // start row loop at row 1 and compare letters
    for (let row = 1; row < strs.length; row++) {
      // compare letters
      if (strs[row][col] < strs[row - 1][col]) {
        count++;
        break;
      }
    }
  }
  return count;
};


// O(m*n*log(n)) time | O(m) space
const minDeletionSize2 = (strs) => {
  // declare variable count to be 0
  let count = 0;
  // loop through strs starting with columns
  for (let col = 0; col < strs[0].length; col++) {
    let tempStr = [];
    for (let row = 0; row < strs.length; row++) {
      tempStr.push(strs[row][col]);
    }
    // check if reversed string equal to temp str
    if (tempStr.join("") !== tempStr.sort().join("")) {
      count++;
    }
  }
  return count;
};
