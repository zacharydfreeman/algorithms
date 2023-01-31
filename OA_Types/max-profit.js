/*
An Amazon seller is deciding which of their products to invest in for the next quarter to maximize
their profits. They have each of their products listed as segments of a circle. Due to varying
market conditions, the products do not sell consistenly. The seller want to achieve
maximum profit using limited resources for investment.
The product list is segmented into a number of equal segments, and a projected
profit is calculated for each segment. The projected profit is the cost to invest versus
the sale price of the product. The seller has chosen to invest in a number of continguous segments along with those opposite.
Determine the maximum profit the seller can achieve using this approach

Input: [1, 5, 1, 3, 7, -3]
k = 2
Output => 16
 */

// Approach: Sliding window
// O(n) time | O(1) space
const maxProfit = (profit, k) => {
  // declare mid point variable
  let midPoint = profit.length / 2;
  // initialize window
  let window = 0;
  for (let i = 0; i < k; i++) {
    let val1 = profit[i];
    let val2 = profit[i + midPoint];
    window += val1 + val2;
  }
  // declare maxSum
  let maxProfit = window;
  for (let i = 1; i < profit.length - 1; i++) {
    // update window
    // what do we want to remove
    window -= profit[i - 1] + profit[(i - 1 + midPoint) % profit.length];
    // what do we want to add
    window += profit[i + 1] + profit[(i + midPoint + 1) % profit.length];
    // update maxprofit
    maxProfit = Math.max(maxProfit, window);
  }

  return maxProfit;
};

// Approach: Brute force
// O(n*k) time | O(1) space
const maxProfit2 = (profit, k) => {
  let midPoint = profit.length / 2;
  let maxProfit = -Infinity;
  for (let i = 0; i < profit.length / 2; i++) {
    let currentSum = 0;
    for (let j = 0; j < k; j++) {
      let circIdx = (i + j + midPoint) % profit.length;
      let val1 = profit[i + j];
      let val2 = profit[circIdx];
      currentSum += val1 + val2;
    }
    maxProfit = Math.max(maxProfit, currentSum);
  }
  return maxProfit;
};
