/**
 * You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.

Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r

Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s

Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.
word1:  a   b   c   d
word2:    p   q 
merged: a p b q c   d
 */

// Approach: Two pointers (merge sort)
// O(n + m) time | O(n + m) space
const mergeAlternately = (word1, word2) => {
  //declare pointers
  let i = 0;
  let j = 0;
  let output = '';
  let count = 0;
  while (i < word1.length && j < word2.length) {
    if (count % 2 === 0) {
      output += word1[i];
      i++;
    } else {
      output += word2[j];
      j++;
    }
    count++;
  }
  // if i is not at end of word1, add to output
  while (i < word1.length) {
    output += word1[i];
    i++;
  }
  // if j is not at end of word2, add to output
  while (j < word2.length) {
    output += word2[j];
    j++;
  }

  return output;
};
