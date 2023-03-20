/* 
Determine whether a target substring can be found within a string! 
No regex allowed! No string.prototype.includes or string.prototype.indexOf!

Your solution should have O(n * m) time-complexity where:
n is equal to the given string length
m is equal to the target substring length

I.e. in 'xztzcatbfbbq' find 'cat' 

Input: 'xztzcatbfbbq', 'cat'
Output: true

Input: 'finding a needle in a haystack', 'lein'
Output: false
*/

// O(n * m) time | O(1) space where n is length of string and m is length of substring
const needleInHaystack = (string, substring) => {
  let j = 0; // substring
  for (let i = 0; i < string.length; i++) {
    let k = i;
    while (substring[j] === string[k] && k < string.length) {
      j++;
      k++;
    }
    if (j === substring.length) return true;
    j = 0;
  }
  return false;
};

/*
  Extension: Now imagine the target substring and string both might have underscores '_'.
  Treat '_'s as wildcards, or blank pieces in Scrabble - i.e., they can be any letter.
  
  Input: '_ello_orld', 'helloworl_'
  Output: true
  
  Input: 'montana', '__o__'
  Output: false
  */

// O(n * m) time | O(1) space where n is length of string and m is length of substring
const needleInHaystackWithWildcards = (string, substring) => {
  let j = 0; // substring
  for (let i = 0; i < string.length; i++) {
    let k = i;
    while (
      substring[j] === '_' ||
      string[k] === '_' ||
      (substring[j] === string[k] && k < string.length)
    ) {
      j++;
      k++;
    }
    if (j === substring.length) return true;
    j = 0;
  }
  return false;
};
