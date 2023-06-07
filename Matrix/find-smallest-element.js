/* 
Given an m x n matrix mat where every row is sorted in strictly increasing order, return the smallest common element in all rows.

If there is no common element, return -1.

Input: mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
Output: 5

Input: mat = [[1,2,3],[2,3,4],[2,3,5]]
Output: 2
*/

// O(m * n) time | O(n) space where m is the number of rows and n is the number of columns
const smallestCommonElement = (mat) => {
  let currentSet = new Set([...mat[0]]);
  for (let row = 1; row < mat.length; row++) {
    const newSet = new Set();
    for (let col = 0; col < mat[0].length; col++) {
      if (currentSet.has(mat[row][col])) {
        newSet.add(mat[row][col]);
        if (row === mat.length - 1) return mat[row][col];
      }
    }
    currentSet = newSet;
  }
  return -1;
};
