/* 
Given an integer n, return a string array answer (1-indexed) where:

answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.

Input: n = 3
Output: ["1","2","Fizz"]

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
*/

// O(n) time | O(1) space
const fizzBuzz = (n) => {
  const output = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      output.push('FizzBuzz');
    } else if (i % 5 === 0) {
      output.push('Buzz');
    } else if (i % 3 === 0) {
      output.push('Fizz');
    } else {
      output.push(String(i));
    }
  }

  return output;
};
