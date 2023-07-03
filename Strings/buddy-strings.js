/* 
Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.

Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].

For example, swapping at indices 0 and 2 in "abcd" results in "cbad".

Input: s = "ab", goal = "ba"
Output: true
Explanation: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.

Input: s = "ab", goal = "ab"
Output: false
Explanation: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.

Input: s = "aa", goal = "aa"
Output: true
Explanation: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal.

abcde
abcde
*/

// O(n) time | O(1) space
const buddyStrings = (s, goal) => {
  // if strings arent equal length return false
  if (s.length !== goal.length) return false;
  // check freq of chars and make sure each char has same frequency
  const [sMap, gMap] = [getFreqMap(s), getFreqMap(goal)];
  if (!checkMaps(sMap, gMap)) return false;
  let count = 0; // number of mismatched letters
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) count++;
  }
  // if count is 2 return true
  if (count === 2) return true;
  // if count is 0
  if (count === 0) {
    if (Object.keys(sMap).length === s.length) return false;
    return true;
  }

  return false;
};

const getFreqMap = (s) => {
  const map = {};
  for (let char of s) {
    map[char] = map[char] + 1 || 1;
  }
  return map;
};

const checkMaps = (m1, m2) => {
  for (let char in m1) {
    if (!(char in m2)) return false;
    if (m1[char] !== m2[char]) return false;
  }
  return true;
};
