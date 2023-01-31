/*

Given an integer x, return true if x is a
palindrome
, and false otherwise.

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
 */

const isPalindrome = (x) => {
  // if x is negative, it cant be a palindrome
  if (x === 0) return true;
  if (x < 0 || x % 10 === 0) return false;
  // declare a new number and current number
  let current = x;
  let num = 0; // we are going to reverse half of the number
  // keep going until num > x becuase that means you converted half the number
  while (num < current) {
    // get last digit
    let digit = current % 10;
    // update num
    num = num * 10 + digit;
    // update current
    current = Math.floor(current / 10);
  }
  return num === current || Math.floor(num / 10) === current;
};
console.log(isPalindrome(88888));
