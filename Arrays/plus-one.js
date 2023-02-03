/*
You are given a large integer represented as an integer array digits,
where each digits[i] is the ith digit of the integer.
The digits are ordered from most significant to least significant in left-to-right order.
The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
 */

// O(n) time | O(n) space
const plusOne = (digits) => {
  const output = [];
  let carry = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (i === digits.length - 1) {
      const num = 1 + digits[i];
      const digit = num % 10;
      carry = num >= 10 ? 1 : 0;
      output.push(digit);
    } else {
      const num = digits[i] + carry;
      const digit = num % 10;
      carry = num >= 10 ? 1 : 0;
      output.push(digit);
    }
  }
  if (carry > 0) {
    output.push(carry);
  }
  return output.reverse();
};
