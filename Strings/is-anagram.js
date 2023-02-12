/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false
 */

const isAnagram = (s, t) => {
  // put char count of s in map
  const sMap = {};
  for (let char of s) {
    sMap[char] = (sMap[char] || 0) + 1;
  }

  // reduce sMap with char of t
  for (let char of t) {
    if (!(char in sMap)) return false;
    sMap[char]--;
  }

  // check to see that all characters are 0
  for (let char in sMap) {
    if (sMap[char] !== 0) return false;
  }

  return true;
};
