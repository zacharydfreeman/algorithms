/*
Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].

The objective of the game is to end with the most stones. The total number of stones across all the piles is odd, so there are no ties.

Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile of stones either from the beginning or from the end of the row. This continues until there are no more piles left, at which point the person with the most stones wins.

Assuming Alice and Bob play optimally, return true if Alice wins the game, or false if Bob wins.

Input: piles = [5,3,4,5]
Output: true
Explanation: 
Alice starts first, and can only take the first 5 or the last 5.
Say she takes the first 5, so that the row becomes [3, 4, 5].
If Bob takes 3, then the board is [4, 5], and Alice takes 5 to win with 10 points.
If Bob takes the last 5, then the board is [3, 4], and Alice takes 4 to win with 9 points.
This demonstrated that taking the first 5 was a winning move for Alice, so we return true.

Input: piles = [3,7,2,3]
Output: true

*/

// Approach: Clever trick - Alice always wins
// O(1) time | O(1) space
const stoneGame = (piles) => {
  return true;
};
// Approach: DP with Tabulation
// O(n^2) time | O(n^2) space
const stoneGame2 = (piles) => {
  const N = piles.length;
  // Make a (N+2) by (N+2) array, initialized with 0s.
  const dp = Array(N + 2)
    .fill(0)
    .map(() => Array(N + 2).fill(0));

  // dp[i+1][j+1] = the value of the game [piles[i], ..., piles[j]]
  for (let size = 1; size <= N; ++size)
    for (let i = 0, j = size - 1; j < N; ++i, ++j) {
      let parity = (j + i + N) % 2; // j - i - N; but +x = -x (mod 2)
      if (parity == 1)
        dp[i + 1][j + 1] = Math.max(
          piles[i] + dp[i + 2][j + 1],
          piles[j] + dp[i + 1][j]
        );
      else
        dp[i + 1][j + 1] = Math.min(
          -piles[i] + dp[i + 2][j + 1],
          -piles[j] + dp[i + 1][j]
        );
    }

  return dp[1][N] > 0;
};
