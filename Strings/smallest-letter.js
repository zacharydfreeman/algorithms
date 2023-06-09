/* 
You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

Input: letters = ["c","f","j"], target = "c"
Output: "f"
Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

Input: letters = ["x","x","y","y"], target = "z"
Output: "x"
Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].

*/

// Approach: Binary Search
// O(log(n)) time | O(1) space
const nextGreatestLetter = (letters, target) => {
  let l = 0;
  let r = letters.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (letters[mid].localeCompare(target) > 0) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  if (l >= letters.length) return letters[0];
  return letters[l];
};

// O(n) time | O(1) space
const nextGreatestLetter2 = (letters, target) => {
  for (let letter of letters) {
    if (target.localeCompare(letter) < 0) return letter;
  }
  return letters[0];
};
