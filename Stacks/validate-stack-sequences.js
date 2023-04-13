/**
 * Given two integer arrays pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack, or false otherwise.

Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might do the following sequence:
push(1), push(2), push(3), push(4),
pop() -> 4,
push(5),
pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.
 */

// O(n) time | O(n) space
const validateStackSequences = (pushed, popped) => {
  const stack = [];
  let i = 0;
  let j = 0;
  while (i <= pushed.length && j < popped.length) {
    // check if stack is not empty and top of stack does not euqal current index of pop, then push
    if (!stack.length || stack[stack.length - 1] !== popped[j]) {
      // push a number into stack and move i pointer
      stack.push(pushed[i]);
      i++;
    } else {
      // pop and move j pointer
      stack.pop();
      j++;
    }
  }

  return stack.length === 0;
};
