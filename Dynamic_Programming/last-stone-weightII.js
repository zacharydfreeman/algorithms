/* 
You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the smallest possible weight of the left stone. If there are no stones left, return 0.

Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.

Input: stones = [31,26,33,21,40]
Output: 5

*/

// Top Down DP with Memoization
// O(n * T) time | O(n * T) space where n is the length of the stones array and T is the total sum
const lastStoneWeightII = (stones) => {
  const sum = stones.reduce((total, weight) => (total += weight));
  const target = Math.ceil(sum / 2);
  const memo = {};

  const dfs = (idx, total) => {
    // memoization
    const key = idx + ',' + total;
    if (key in memo) return memo[key];
    if (total >= target || idx === stones.length)
      return Math.abs(total - (sum - total));
    // dont take or take
    memo[key] = Math.min(
      dfs(idx + 1, total + stones[idx]),
      dfs(idx + 1, total)
    );
    return memo[key];
  };

  return dfs(0, 0);
};
