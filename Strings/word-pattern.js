/* 
Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

Input: pattern = "abba", s = "dog cat cat dog"
Output: true

Input: pattern = "abba", s = "dog cat cat fish"
Output: false

Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false

*/

// O(p + s) time | O(w) space where w is the number of unique words
const wordPattern = (pattern, s) => {
  // {char: word}, {word: char}
  const charMap = {};
  const wordMap = {};
  const words = s.split(' ');

  if (words.length !== pattern.length) return false;
  for (let i = 0; i < words.length; i++) {
    const char = pattern[i];
    const word = words[i];
    if (!(char in charMap)) {
      if (wordMap.hasOwnProperty(word)) {
        return false;
      } else {
        charMap[char] = word;
        wordMap[word] = char;
      }
    } else {
      if (charMap[char] !== word) return false;
    }
  }
  return true;
};

const pattern = 'abba';
const s = 'dog constructor constructor dog';

console.log(wordPattern(pattern, s));
