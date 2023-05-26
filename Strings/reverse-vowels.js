/* 
Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

Input: s = "hello"
Output: "holle"

Input: s = "leetcode"
Output: "leotcede"

*/

// Approach: Two pointers
// O(n) time | O(n) space
const reverseVowels = (s) => {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let l = 0;
  let r = s.length - 1;
  let leftHalf = '';
  let rightHalf = '';
  while (l <= r) {
    if (!vowels.has(s[l])) {
      leftHalf += s[l];
      l++;
    } else if (!vowels.has(s[r])) {
      rightHalf = s[r] + rightHalf;
      r--;
    } else {
      leftHalf += s[r];
      if (r !== l) rightHalf = s[l] + rightHalf;
      r--;
      l++;
    }
  }
  return leftHalf + rightHalf;
};
