/**
 * There are n piles of coins on a table. Each pile consists of a positive number of coins of assorted denominations.

In one move, you can choose any coin on top of any pile, remove it, and add it to your wallet.

Given a list piles, where piles[i] is a list of integers denoting the composition of the ith pile from top to bottom, and a positive integer k, return the maximum total value of coins you can have in your wallet if you choose exactly k coins optimally.

Input: piles = [[1,100,3],[7,8,9]], k = 2
Output: 101
Explanation:
The above diagram shows the different ways we can choose k coins.
The maximum total we can obtain is 101.

Input: piles = [[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], k = 7
Output: 706
Explanation:
The maximum total can be obtained if we choose all coins from the last pile.
 */

// O(k * s) time | O(n * k) where s is the total number of elements, k is number of coins and n is number of piles
const maxValueOfCoins = (piles, k, i = 0, memo = {}) => {
  if (i === piles.length) return 0;
  const key = k + ',' + i;
  if (key in memo) return memo[key];
  // skip current pile
  let result = maxValueOfCoins(piles, k, i + 1, memo);
  let sum = 0;
  for (let j = 0; j < Math.min(k, piles[i].length); j++) {
    sum += piles[i][j];
    result = Math.max(
      result,
      sum + maxValueOfCoins(piles, k - j - 1, i + 1, memo)
    );
  }
  memo[key] = result;
  return memo[key];
};
