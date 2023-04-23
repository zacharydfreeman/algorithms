/**
 * You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. You can divide each pile into any number of sub piles, but you cannot merge two piles together.

You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same number of candies. Each child can take at most one pile of candies and some piles of candies may go unused.

Return the maximum number of candies each child can get.

Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.

Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.
 */

// Approach: Binary search
// O(nlog(m)) time | O(1) space where n is the length of the candies array and m is the max val in candies array
const maximumCandies = (candies, k) => {
  // declare bounds
  let l = 0;
  let r = Math.max(...candies);
  let max = 0;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    // check if valid pile
    if (isValid(mid, candies, k)) {
      // set max = to mid and go right
      max = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return max;
};

const isValid = (pile, candies, k) => {
  // count how many kids the current pile can serve
  let count = 0;
  for (let candy of candies) {
    count += Math.floor(candy / pile);
  }
  return count >= k;
};
