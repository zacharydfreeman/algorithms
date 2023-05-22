/*
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 105.

Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Input: s = "3[a2[c]]"
Output: "accaccacc"

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
*/

// O(k * m) time | O(m + n) where k is max number, m is length of string and n is number of digits in string
const decodeString = (s) => {
  const numbers = '0123456789';
  const stack = [];

  for (let char of s) {
    if (char !== ']') {
      stack.push(char);
    } else {
      // get the string
      let string = '';
      while (stack.length && stack[stack.length - 1] !== '[') {
        const letter = stack.pop();
        string = letter + string;
      }
      // pop the [ off and get number
      stack.pop();
      let num = '';
      while (stack.length && numbers.includes(stack[stack.length - 1])) {
        const digit = stack.pop();
        num = digit + num;
      }

      let newString = '';
      for (let i = 0; i < Number(num); i++) {
        newString += string;
      }
      stack.push(newString);
    }
  }
  return stack.join('');
};
