/* 
Given a string s, partition the string into one or more substrings such that the characters in each substring are unique. That is, no letter appears in a single substring more than once.

Return the minimum number of substrings in such a partition.

Note that each character should belong to exactly one substring in a partition.

Input: s = "abacaba"
Output: 4
Explanation:
Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
It can be shown that 4 is the minimum number of substrings needed.

Input: s = "ssssss"
Output: 6
Explanation:
The only valid partition is ("s","s","s","s","s","s").
*/

// Approach: Greedy
// O(n) time | O(1) space
const partitionString = (s) => {
  let seen = new Set();
  let count = 1;
  for (let char of s) {
    if (!seen.has(char)) {
      seen.add(char);
    } else {
      count++;
      // clear object
      seen = new Set();
      seen.add(char);
    }
  }
  return count;
};
