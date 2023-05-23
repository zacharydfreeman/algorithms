/* 
Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

*/

// O(n) time | O(n) space
const removeKDigits = (num, k) => {
  if (k >= num.length) return '0';
  const stack = [];
  let removed = 0;
  for (let digit of num) {
    while (
      stack.length &&
      Number(stack[stack.length - 1]) > Number(digit) &&
      removed < k
    ) {
      stack.pop();
      removed++;
    }
    stack.push(digit);
  }
  while (removed < k) {
    stack.pop();
    removed++;
  }

  const temp = stack.join('');
  // find where leading 0s stop
  let i = 0;
  while (temp[i] === '0') {
    i++;
  }
  const res = temp.slice(i);
  return res === '' ? '0' : res;
};
