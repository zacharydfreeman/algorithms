/*
As part of a Day 1 Challenge, your new team at Amazon has created a basic alphabet-based
encryption and has asked members to test the cipher. A simple cipher is built on the alphabet wheel which has uppercase english letters['A'-'Z'] written on it:

Given an encrypted string consisting of english letters['A'-'Z'] only, decrypt the string by replacing
each character with the kth character away on the wheel in counter clockwise direction. Counter-clockwise is the opposite direction is which the hands on a clock usually move.
 */

// O(n) time | O(1) space where n is length of string
const simpleCipher = (encrypted, k) => {
  // declare an array with alphabet
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const alphabetMap = {};
  // populate map
  for (let i = 0; i < alphabet.length; i++) {
    alphabetMap[alphabet[i]] = i;
  }
  // declare output string
  let newStr = "";
  for (let i = 0; i < encrypted.length; i++) {
    const char = encrypted[i];
    const charIdx = alphabetMap[char];
    const idx = (charIdx + 26 - k) % 26;
    newStr += alphabet[idx];
  }

  return newStr;
};

console.log(simpleCipher("VTAOG", 2));
