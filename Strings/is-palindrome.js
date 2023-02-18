/*
Write a function that takes in a strings and returns whether or not it is a palindrome
*/

// Approach: Iterative
// O(n) time | O(1) space
const isPalindrome = (string) => {
  let l = 0;
  let r = string.length - 1;
  while (l <= r) {
    if (string[l] !== string[r]) return false;
    l++;
    r--;
  }
  return true;
};

// Approach: Recursive
// O(n) time | O(n) space where n is length of string
const isPalindrome2 = (string, i = 0, j = string.length - 1) => {
  if (i > j) return true;
  if (string[i] !== string[j]) return false;
  return isPalindrome2(string, i + 1, j - 1);
};
