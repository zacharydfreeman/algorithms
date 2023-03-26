/*  
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

Input: s = "III"
Output: 3
Explanation: III = 3.

Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.

Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

*/

// O(n) time | O(1) space where n is the lenght of the string
const romanToInt = (s) => {
  // delcare map and number variable
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let number = 0;
  // loop through string
  for (let i = 0; i < s.length; i++) {
    // if last character, add corresponding number in map to number and return number
    if (i === s.length - 1) {
      number += map[s[i]];
      return number;
    }
    // get current number and next number
    const currentNum = map[s[i]];
    const nextNum = map[s[i + 1]];
    // if next number > current number, make negative and add to number
    if (nextNum > currentNum) {
      number += -1 * currentNum;
    } else {
      // otherwise just add current number to number
      number += currentNum;
    }
  }
};
