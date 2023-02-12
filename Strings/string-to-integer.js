/*
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

*/

// O(n) time | O(1) space
const myAtoi = (s) => {
  let sign = 1;
  let result = 0;
  let index = 0;
  let n = s.length;

  let INT_MAX = Math.pow(2, 31) - 1;
  let INT_MIN = -Math.pow(2, 31);

  // Discard all spaces from the beginning of the input string.
  while (index < n && s[index] == ' ') {
    index++;
  }
  // sign = +1, if it's positive number, otherwise sign = -1.
  if (index < n && s[index] == '+') {
    sign = 1;
    index++;
  } else if (index < n && s[index] == '-') {
    sign = -1;
    index++;
  }

  // Traverse next digits of s and stop if it is not a digit.
  // End of string is also non-digit character.
  while (index < n && s[index] >= '0' && s[index] <= '9') {
    let digit = s[index] - '0';

    // Check overflow and underflow conditions.
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result == Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)
    ) {
      // If integer overflowed return 2^31-1, otherwise if underflowed return -2^31.
      return sign == 1 ? INT_MAX : INT_MIN;
    }

    // Append current digit to the result.
    result = 10 * result + digit;
    index++;
  }

  // We have formed a valid number without any overflow/underflow.
  // Return it after multiplying it with its sign.
  return sign * result;
};
