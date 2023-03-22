/* 
Given an array of positive integers representing the values of coins in your possession, write a function that returns the minimum amount of change (the minimum sum of money) that you cannot create. The given coins can have any positive ineger value and arent necessarily unique (i.e., you can have multiple coins of the same value)

For example, if you're given coins = [1, 2, 5], the minimum amount of change that you cant create is 4. If you're given no coins, the minimum amount of change that you cant create is 1
*/

// O(nlog(n)) time | O(1) space
const nonConstructibleChange = (coins) => {
  // sort coins array
  coins.sort((a, b) => a - b);
  // declare min change variable
  let minChange = 1;
  for (let coin of coins) {
    // if current coin greater than minChange, return minChange
    if (coin > minChange) return minChange;
    // otherwise add coin value to minChange
    minChange += coin;
  }
  // return minChange
  return minChange;
};
