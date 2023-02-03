/*
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes
the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
 */

const reverse = (x) => {
  // check if x is negative
  const xIsNegative = x < 0;
  // declare num variable and make x positive
  let num = 0;
  x = Math.abs(x);
  while (x) {
    // grab remainder, update num and x
    const remainder = x % 10;
    num = num * 10 + remainder;
    x = Math.floor(x / 10);
  }
  // num is greater than 2 ^ 31 - 1 return 0
  if (num > 2 ** 31 - 1) return 0;
  return xIsNegative ? -1 * num : num;
};
