/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a
different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction.
If you cannot achieve any profit, return 0.

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

 */

// O(n) time | O(1) space where n is length of prices array
const maxProfit = (prices) => {
  // declare max and current min variables
  let max = 0;
  let minPrice = prices[0];
  // loop through prices
  for (let i = 1; i < prices.length; i++) {
    // check if current price is greater than minPrice
    if (prices[i] > minPrice) {
      // calculate profit and update max
      const profit = prices[i] - minPrice;
      max = Math.max(max, profit);
    } else {
      // update minPrice
      minPrice = prices[i];
    }
  }
  return max;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
