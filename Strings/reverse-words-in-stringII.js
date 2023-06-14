/* 
Given a character array s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by a single space.

Your code must solve the problem in-place, i.e. without allocating extra space.

Input: s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]

Input: s = ["a"]
Output: ["a"]

*/

// O(n) time | O(1) space
const reverseWords = (s) => {
  s.reverse();
  let l = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ' || i === s.length - 1) {
      // reverse
      let r = i === s.length - 1 ? i : i - 1;
      while (l <= r) {
        [s[l], s[r]] = [s[r], s[l]];
        l++;
        r--;
      }
      l = i + 1;
    }
  }
  return s;
};
