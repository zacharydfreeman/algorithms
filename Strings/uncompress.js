/*
Write a function, uncompress, that takes in a string as an argument.
The input string will be formatted into multiple groups according to the following pattern:

The function should return an uncompressed version of the string where each 'char' of a group is repeated
'number' times consecutively. You may assume that the input string is well-formed according
to the previously mentioned pattern.

uncompress("2c3a1t"); // -> 'ccaaat'
uncompress("4s2b"); // -> 'ssssbb'
uncompress("2p1o5p"); // -> 'ppoppppp'

*/

// Approach: Two Pointers
// O(n*m) time | O(n*m) space where n is number of groups and m is max number of groups
const uncompress = (s) => {
  // declare a numbers string that we will use to see if current char of string is a character
  const numbers = '0123456789';
  // declare two pointers and result string
  let output = '';
  let i = 0; // points to beginning of number
  let j = 0; // points to a character

  while (j < s.length) {
    if (numbers.includes(s[j])) {
      // move j forward
      j++;
    } else {
      // get number and character
      const number = Number(s.slice(i, j));
      const char = s[j];
      for (let i = 0; i < number; i++) {
        output += char;
      }
      // move pointers forward
      i = j + 1;
      j = i;
    }
  }
  return output;
};
