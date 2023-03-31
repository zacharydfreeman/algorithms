/* 
We can scramble a string s to get a string t using the following algorithm:

If the length of the string is 1, stop.
If the length of the string is > 1, do the following:
Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
Apply step 1 recursively on each of the two substrings x and y.
Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.

Input: s1 = "great", s2 = "rgeat"
Output: true
Explanation: One possible scenario applied on s1 is:
"great" --> "gr/eat" // divide at random index.
"gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.
"gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
"g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
"r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
"r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
The algorithm stops now, and the result string is "rgeat" which is s2.
As one possible scenario led s1 to be scrambled to s2, we return true.

Input: s1 = "abcde", s2 = "caebd"
Output: false

Input: s1 = "a", s2 = "a"
Output: true
*/

// O(n^4) time | O(n^3) space where n is length of string
const isScramble = (s1, s2, memo = {}) => {
  const key = s1 + s2;
  if (key in memo) return memo[key];
  if (s1 === s2) return true;
  if (s1.length !== s2.length) return false;
  if (s1.length <= 1) return s1 === s2;
  // divide
  for (let i = 1; i < s1.length; i++) {
    if (
      (isScramble(s1.slice(0, i), s2.slice(0, i), memo) &&
        isScramble(s1.slice(i), s2.slice(i), memo)) ||
      (isScramble(s1.slice(0, i), s2.slice(s1.length - i), memo) &&
        isScramble(s1.slice(i), s2.slice(0, s1.length - i), memo))
    ) {
      memo[key] = true;
      return memo[key];
    }
  }

  memo[key] = false;
  return memo[key];
};
