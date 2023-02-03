/*
Write a function, befittingBrackets, that takes in a string as an argument.
The function should return a boolean indicating whether or not the string
contains correctly matched brackets.

You may assume the string contains only characters: ( ) [ ] { }
 */

const balancedBrackets = (string) => {
  // declare a dictionary to hold valid characters
  const dict = { "(": ")", "[": "]", "{": "}" };
  // declare stack to track which chars we have seen
  const stack = [];
  for (let char of string) {
    // if the char is in the dictionary, then we want to add its value pair to stack
    if (char in dict) {
      stack.push(dict[char]);
    } else if (char === ")" || char === "}" || char === "]") {
      // if stack is empty, return false
      if (!stack.length) return false;
      // we need to check if the last char that was popped off from stack equals current char
      const lastChar = stack.pop();
      if (char !== lastChar) return false;
    }
  }
  // return true if the stack length is 0
  return stack.length === 0;
};
