/*
At Amazon's annual sale. employees are tasked with generating valid discount coupons for loyal customers.
However, there are some used/invalid coupons in the mix and the challenge in this task is to determine
whether a given discount coupon is valid or not.

The validity of a discount coupon is determined as follows:

An empty discount coupon is valid.
If a discount coupon A is valid, then a discount coupon C made by adding one character x to both
the beginning of A and the end of A is also valid (i.e the discount coupon C = xAx is valid).
If two discount coupons A and B are valid, then the concatenation of B and A is also valid
(i.e the coupons AB and BA are both valid).
Given n discount coupons, each coupon consisting of only lowercase English characters,
where the ith discount coupon is denoted discounts[i], determine if each discount coupon is valid or not.
A valid coupon is denoted by 1 in the answer may while an invalid coupon is denoted by 0.

Input
discounts: Array of discount coupons.
Output
Array of integers, a valid coupon is denoted by 1 and an invalid coupon is denoted by 0.

Examples
Example 1:
Input:

discounts = ['abba', 'abca']
Output: [1, 0]

Explanation:

'abba' is valid and 'abca' is invalid.

An empty string is valid
You can add same character to a valid string X, and create another valid string yXy
You can concatenate two valid strings X and Y, so XY will also be valid.
Ex: vv, xbbx, bbccdd, xyffyxdd are all valid.
 */
// (), (()), ()()(), ((()))()
// Approach: treat like valid parenthesis. Have a stack and seen set
// O(n*m) time | O(n) space where n is length of discounts array and m is longest string in array
const validDiscounts = (discounts) => {
  // declare output array
  const output = [];
  // loop through discounts and check if valid
  for (let discount of discounts) {
    if (isValid(discount)) {
      output.push(1);
    } else {
      output.push(0);
    }
  }
  return output;
};

const isValid = (string) => {
  // declare a seen set and stack
  const seen = new Set();
  const stack = [];
  // loop through character of string
  for (let i = 0; i <= string.length; i++) {
    // grab current character
    const char = string[i];
    // if in seen you need to make sure last item on stack is same as current char
    if (seen.has(char)) {
      // pop off stack and check if equal
      const lastChar = stack.pop();
      if (char !== lastChar) return false;
      // remove from set
      seen.delete(char);
    } else {
      // add to set and push to stack
      seen.add(char);
      stack.push(char);
    }
  }
  // return true if you make it out of loop
  return true;
};
