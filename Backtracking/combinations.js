/* 
Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.

Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.

Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.

*/

const combine = (n, k) => {
  const combinations = [];
  const combo = [];
  const dfs = (num) => {
    if (combo.length === k) {
      combinations.push([...combo]);
      return;
    }
    for (let i = num; i <= n; i++) {
      combo.push(i);
      dfs(i + 1);
      combo.pop();
    }
  };
  dfs(1);
  return combinations;
};

const n = 5,
  k = 3;

console.log(combine(n, k));
