/* 
Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: There is 1 equal row and column pair:
- (Row 2, Column 1): [2,7,7]

Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
Output: 3
Explanation: There are 3 equal row and column pairs:
- (Row 0, Column 0): [3,1,2,2]
- (Row 2, Column 2): [2,4,2,2]
- (Row 3, Column 2): [2,4,2,2]

*/

// O(m * n) time | O(m * n) space
const equalPairs = (grid) => {
  // put rows in a set
  const rows = {};
  for (let row = 0; row < grid.length; row++) {
    let key = '';
    for (let col = 0; col < grid[0].length; col++) {
      key += grid[row][col] + ',';
    }
    rows[key] = rows[key] + 1 || 1;
  }

  let count = 0;
  for (let col = 0; col < grid[0].length; col++) {
    let key = '';
    for (let row = 0; row < grid.length; row++) {
      key += grid[row][col] + ',';
    }

    if (key in rows) count += rows[key];
  }
  return count;
};
