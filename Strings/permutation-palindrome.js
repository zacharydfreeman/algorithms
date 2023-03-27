/**
 * Given a string, determine if any of the permutations of that string is a palindrome
 * @see: Permutations: https://stattrek.com/statistics/dictionary.aspx?definition=permutation
 * @see: Palindromes: https://examples.yourdictionary.com/palindrome-examples.html
 *
 * In terms of time complexity, see if you can solve this in O(n) / linear time.
 *
 * Example:
 * 	- permPalin('abab') => true
 * 	- permPalin('cbaba') => true
 * 	- permPalin('cbac') => false
 * 	- permPalin('a') => true
 *
 * Hint: Think about the length of the string and how that relates to the frequencies of the characters
 */

// Approach: Make a char count hash map and determine how many odd counts there are
// O(n) time | O(n) space
const permPalin = (str) => {
  if (typeof str !== 'string') return false;
  const counts = {};
  for (let char of str) {
    counts[char] = counts[char] + 1 || 1;
  }
  let odd = 0;
  for (let char in counts) {
    if (counts[char] % 2) odd++;
  }

  return odd <= 1;
};

/*
 * Extension: Solve in constant space complexity.
 */
const permPalinAdvanced = (str) => {};
