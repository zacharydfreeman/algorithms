/*
The interns at Amazon were asked to review the company's stock value over a period.
Given the stock prices of n months, the net price change for the ith month is defined as the absolute
difference between the average of stock prices for the first i months and for the remainin (n -i) months
where 1 <= i < n. Note that these averages are rounded down

Given an array of stock prices, find the month at which the net price change is minimum. If there are
several such months, return the earliest month

Note: the average of a set of integers here is defined as the sum of the integers divided by the total
number of integers, rounded down to the nearest integer

prices = [1, 3, 2, 3]
output => 2. net price is 0 in second month
 */

// [1, 4, 6, 9]
// O(n) time | O(n) space
const minAverageStockPrice = (prices) => {
  // get prefix sums
  const sums = [prices[0]];
  for (let i = 1; i < prices.length; i++) {
    sums.push(sums[i - 1] + prices[i]);
  }
  // declare min
  let minPrice = Infinity;
  let month = 0;
  // loop through prices
  for (let i = 0; i < prices.length; i++) {
    const prevAvg = Math.floor(sums[i] / (i + 1));
    const postAvg = Math.floor(
      (sums[prices.length - 1] - sums[i]) / (prices.length - 1 - i)
    );
    if (Math.abs(prevAvg - postAvg) < minPrice) {
      minPrice = Math.abs(prevAvg - postAvg);
      month = i + 1;
    }
  }

  return month;
};

const prices = [1, 3, 2, 3];
const prices2 = [1, 3, 2, 4, 5];
const prices3 = [1, 1, 1, 1, 1];
console.log(minAverageStockPrice(prices));
console.log(minAverageStockPrice(prices2));
console.log(minAverageStockPrice(prices3));
