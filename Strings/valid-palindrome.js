/*
A phrase is a palindrome if, after converting all uppercase letters into
lowercase letters and removing all non-alphanumeric characters,
it reads the same forward and backward. Alphanumeric characters include letters
and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
*/

// O(n) time | O(1) space
const isPalindrome = (s) => {
  // lower case the string
  s = s.toLowerCase();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (!alphabet.includes(s[i]) && !numbers.includes(s[i])) {
      i++;
    } else if (!alphabet.includes(s[j]) && !numbers.includes(s[j])) {
      j--;
    } else {
      if (s[i] !== s[j]) return false;
      i++;
      j--;
    }
  }

  return true;
};

// Approach: Regex
// O(n) time | O(n) space
const isPalindrome2 = (s) => {
  // remove non alphanumeric characters and spaces
  const regex = /[^\w]+/gi;
  // make all letters lower case and replace with regex expression
  const newString = s.toLowerCase().replace(regex, '').replace(/_/, '');
  // loop through string and check if palindrome
  for (let i = 0; i < Math.floor(newString.length / 2); i++) {
    if (newString[i] !== newString[newString.length - i - 1]) return false;
  }
  return true;
};

const s = 'A man, a plan, a canal: Panama';
console.log(isPalindrome(s));
