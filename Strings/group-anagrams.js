/*
Write a function that takes in an array of strings and groups anagrams together.

Anagrams are strings made up of exactly the same letters, where order doesnt matter.
For example,"cinema" and "iceman" are anagrams.

Your function should return a list of anagrams in no particular order

const words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
output => [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
*/

// Approach: sort each word alphabetically and store into a map
// O(n * slog(s)) time | O(n * s) space
const groupAnagrams = (words) => {
  // declare words Map
  const wordsMap = {};
  for (let word of words) {
    // split the word into an array so you can sort alphabetically and then join to make a word again
    const sortedWord = word.split("").sort().join("");
    // add sorted word to map if not in
    if (!(sortedWord in wordsMap)) wordsMap[sortedWord] = [];
    wordsMap[sortedWord].push(word);
  }
  return Object.values(wordsMap);
};

// Approach: Brute force. Look at all combos of words and see if anagram
// O(s * n^2) time | O(s * n) space where n in length of words array and s is length of longest string
// for the space complexity we are creating n maps with a most s characters in it
const groupAnagrams2 = (words) => {
  // declare output variable to be empty array
  const output = [];
  // declare a visited word set that will track words youve already explored
  const wordSet = new Set();
  // loop through all words
  for (let word of words) {
    // declare anagrams variable to be an array with the word
    const anagrams = [word];
    // if word is in visited, continue. If not, add word to visited
    if (wordSet.has(word)) continue;
    wordSet.add(word);
    for (let secondWord of words) {
      if (wordSet.has(secondWord)) continue;
      if (isAnagram(word, secondWord)) {
        anagrams.push(secondWord);
        wordSet.add(secondWord);
      }
    }
    output.push(anagrams);
  }
  return output;
};

const isAnagram = (s1, s2) => {
  // declare a char map
  const charMap = {};
  // loop through s1 and populate map
  for (let char of s1) {
    if (!(char in charMap)) charMap[char] = 0;
    charMap[char]++;
  }
  // loop through s2 and decrement map
  for (let char of s2) {
    if (!(char in charMap)) return false;
    charMap[char]--;
  }

  for (let char in charMap) {
    if (charMap[char] !== 0) return false;
  }

  return true;
};

const words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"];
// output => [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
console.log(groupAnagrams(words));
