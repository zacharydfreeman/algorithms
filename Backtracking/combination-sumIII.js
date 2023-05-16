/* 
Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

Only numbers 1 through 9 are used.
Each number is used at most once.
Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.

Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.

Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

*/

// Approach: Backtracking
// O((9!*k) / (9 - k)!) time | O((9!*k) / (9 - k)!) space
const combinationSum3 = (k, n) => {
  const combos = [];
  const getCombos = (k, n, idx, combo) => {
    if (n === 0 && k === 0) {
      combos.push([...combo]);
      return;
    }
    if (n < 0 || k < 0) return;
    for (let i = idx; i < 10; i++) {
      combo.push(i);
      getCombos(k - 1, n - i, i + 1, combo);
      combo.pop();
    }
  };
  getCombos(k, n, 1, []);
  return combos;
};
