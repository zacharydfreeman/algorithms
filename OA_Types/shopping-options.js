/*
A customer wants to buy a pair of jeans, a pair of shoes, a skirt, and a top but has a
limited budget in dollars. Given different pricing options for each product,
determine how many options our customer has to buy 1 of each product.
You cannot spend more money than the budgeted amount.

Example
priceOfJeans = [2, 3]
priceOfShoes = [4]
priceOfSkirts = [2, 3]
priceOfTops = [1, 2]
budgeted = 10

The customer must buy shoes for 4 dollars since there is only one option.
This leaves 6 dollars to spend on the other 3 items. Combinations of prices
paid for jeans, skirts, and tops respectively that add up to 6 dollars
or less are [2, 2, 2], [2, 2, 1], [3, 2, 1], [2, 3, 1].
There are 4 ways the customer can purchase all 4 items.

Function Description

Complete the getNumberOfOptions function in the editor below.
The function must return an integer which represents the number of
options present to buy the four items.

getNumberOfOptions has 5 parameters:
int[] priceOfJeans: An integer array, which contains the prices of the pairs of jeans available.
int[] priceOfShoes: An integer array, which contains the prices of the pairs of shoes available.
int[] priceOfSkirts: An integer array, which contains the prices of the skirts available.
int[] priceOfTops: An integer array, which contains the prices of the tops available.
int dollars: the total number of dollars available to shop with.

Constraints

1 ≤ a, b, c, d ≤ 103
1 ≤ dollars ≤ 109
1 ≤ price of each item ≤ 109
Note: a, b, c and d are the sizes of the four price arrays
*/

// O(n^2) time | O(n) space
const getNumberOfOptions = (jeans, shoes, skirts, tops, dollars) => {
  // declare pairs map and combos array
  const pairs = {};
  const combos = [];
  // get all possible sums of jean and shoe prices and put into pairs map
  for (let jean of jeans) {
    for (let shoe of shoes) {
      const cost = jean + shoe;
      pairs[cost] = [jean, shoe];
    }
  }
  // loop through skirt and top in order to check which combo we can buy
  for (let skirt of skirts) {
    for (let top of tops) {
      const total = skirt + top;
      // loop through all pairs
      for (let price in pairs) {
        // if total price + price in pairs map is <= dollar then we have found a combination
        if (Number(price) + total <= dollars) {
          combos.push([...pairs[price], skirt, top]);
        }
      }
    }
  }
  return combos;
};

const priceOfJeans = [2, 3];
const priceOfShoes = [4];
const priceOfSkirts = [2, 3];
const priceOfTops = [1, 2];
const budgeted = 10;

console.log(
  getNumberOfOptions(
    priceOfJeans,
    priceOfShoes,
    priceOfSkirts,
    priceOfTops,
    budgeted
  )
);

// Approach: Brute force
// O(n^4) time | O(n) space
const getNumberOfOptions2 = (jeans, shoes, skirts, tops, dollars) => {
  const combos = [];
  for (let jean of jeans) {
    for (let shoe of shoes) {
      for (let skirt of skirts) {
        for (let top of tops) {
          if (jean + shoe + skirt + top <= dollars) {
            combos.push([jean, shoe, skirt, top]);
          }
        }
      }
    }
  }
  return combos;
};
