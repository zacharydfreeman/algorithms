/*

You are given an integer array coins representing coins of different denominations and an
integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount.
If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Input: coins = [1,2,5], amount = 11
[5, 2, 1] 11 - 5 - 5 = 1 - 1 = 0 3 coins
[6, 5, 1] 10 - 6 = 4 - 1- 1- 1 = 0 4 coins

Output: 3
Explanation: 11 = 5 + 5 + 1

Input: coins = [2], amount = 3
Output: -1
 */

// Approach: Bottoms up DP array
// O(n * c) time | O(n) space where n is the amount and c is the length of the coins array
const coinChange = (coins, amount) => {
  // declare dp array of length amount + 1
  const ways = new Array(amount + 1).fill(Infinity);
  ways[0] = 0;
  for (let i = 0; i < ways.length; i++) {
    for (let coin of coins) {
      const total = i + coin;
      if (total < ways.length) {
        ways[total] = Math.min(ways[total], ways[i] + 1);
      }
    }
  }
  return ways[amount] === Infinity ? -1 : ways[amount];
};

// Approach: Top-down DP with memoization
// O(n * c) time | O(n) where n is the amount and c is number of coins
const coinChange2 = (coins, amount) => {
  let ans = _coinChange(coins, amount);
  return ans === Infinity ? -1 : ans;
};

const _coinChange = (coins, amount, memo = {}) => {
  if (amount in memo) return memo[amount];
  if (amount === 0) return 0;
  if (amount < 0) return Infinity;

  let numCoins = Infinity;
  for (let coin of coins) {
    const result = _coinChange(coins, amount - coin, memo);
    numCoins = Math.min(numCoins, 1 + result);
  }

  memo[amount] = numCoins;
  return memo[amount];
};
