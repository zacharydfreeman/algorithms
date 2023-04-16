/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Input: digits = ""
Output: []

Input: digits = "2"
Output: ["a","b","c"]
 */

// O(4^n * n) time | O(4^n * n) space where n is the length of digits
const letterCombinations = (digits) => {
  if (!digits.length) return [];
  const map = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  };
  const combos = [];
  getCombos(digits, '', map, combos);
  return combos;
};

const getCombos = (digits, prefix, map, combos, i = 0) => {
  if (i === digits.length) {
    combos.push(prefix);
    return;
  }

  const digit = digits[i];
  const letters = map[digit];

  for (let letter of letters) {
    getCombos(digits, prefix + letter, map, combos, i + 1);
  }
};
