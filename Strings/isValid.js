/*

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Input: s = "()[]{}"
Output: true

Input: s = "()"
Output: true

Input: s = "(]"
Output: false
 */

// O(n) time | O(n) space
const isValid = function (s) {
  // declare map of characters and stack
  const map = { "{": "}", "(": ")", "[": "]" };
  const stack = [];
  // iterate through string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // char in map, then we want to add its coutnerpart to the stack
    if (char in map) {
      stack.push(map[char]);
    } else {
      // if we hit a closing character and stack is empty, we can automatically return false
      if (stack.length === 0) return false;
      const lastChar = stack.pop();
      // if popped char != current char return false
      if (lastChar !== char) return false;
    }
  }
  // return true if and only if the stack is empty
  return stack.length === 0;
};
let s = "(]";
console.log(isValid(s));
