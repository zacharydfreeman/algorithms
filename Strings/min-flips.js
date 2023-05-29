/* 
You are given a binary string s. You are allowed to perform two types of operations on the string in any sequence:

Type-1: Remove the character at the start of the string s and append it to the end of the string.
Type-2: Pick any character in s and flip its value, i.e., if its value is '0' it becomes '1' and vice-versa.
Return the minimum number of type-2 operations you need to perform such that s becomes alternating.

The string is called alternating if no two adjacent characters are equal.

For example, the strings "010" and "1010" are alternating, while the string "0100" is not.

Input: s = "111000"
Output: 2
Explanation: Use the first operation two times to make s = "100011".
Then, use the second operation on the third and sixth elements to make s = "101010".

Input: s = "010"
Output: 0
Explanation: The string is already alternating.

Input: s = "1110"
Output: 1
Explanation: Use the second operation on the second element to make s = "1010".

*/

// Approach: Sliding Window
// O(n) time | O(n) space
const minFlips = (s) => {
  const n = s.length;
  s += s;
  let alt1 = '';
  let alt2 = '';
  for (let i = 0; i < s.length; i++) {
    if (i % 2 === 0) {
      alt1 += '0';
      alt2 += '1';
    } else {
      alt1 += '1';
      alt2 += '0';
    }
  }
  let minFlips = Infinity;
  let diff1 = 0;
  let diff2 = 0;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    if (s[r] !== alt1[r]) diff1++;
    if (s[r] !== alt2[r]) diff2++;

    if (r - l + 1 > n) {
      diff1 += alt1[l] !== s[l] ? -1 : 0;
      diff2 += alt2[l] !== s[l] ? -1 : 0;
      l++;
    }

    if (r - l + 1 === n) {
      minFlips = Math.min(minFlips, diff1, diff2);
    }
  }

  return minFlips;
};
