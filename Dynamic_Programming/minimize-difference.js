/* 
You are given an m x n integer matrix mat and an integer target.

Choose one integer from each row in the matrix such that the absolute difference between target and the sum of the chosen elements is minimized.

Return the minimum absolute difference.

The absolute difference between two numbers a and b is the absolute value of a - b.

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13
Output: 0
Explanation: One possible choice is to:
- Choose 1 from the first row.
- Choose 5 from the second row.
- Choose 7 from the third row.
The sum of the chosen elements is 13, which equals the target, so the absolute difference is 0.

Input: mat = [[1],[2],[3]], target = 100
Output: 94
Explanation: The best possible choice is to:
- Choose 1 from the first row.
- Choose 2 from the second row.
- Choose 3 from the third row.
The sum of the chosen elements is 6, and the absolute difference is 94.

Input: mat = [[1,2,9,8,7]], target = 6
Output: 1
Explanation: The best choice is to choose 7 from the first row.
The absolute difference is 1.

*/

// O(m * n) time | O(m) space where m is the number of row, n is the number of columns and T is the t
const minimizeTheDifference = (mat, target) => {
  const memo = new Array(mat.length).fill().map(() => new Array(5001).fill(-1));
  const dfs = (idx, total) => {
    if (idx === mat.length) return Math.abs(target - total);
    if (memo[idx][total] !== -1) return memo[idx][total];

    let min = Infinity;
    for (let num of mat[idx]) {
      min = Math.min(min, dfs(idx + 1, total + num));
    }

    memo[idx][total] = min;
    return memo[idx][total];
  };
  return dfs(0, 0);
};

const mat = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(minimizeTheDifference(mat, 13));
