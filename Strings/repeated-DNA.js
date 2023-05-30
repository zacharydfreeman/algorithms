/*
The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

For example, "ACGAATTCCG" is a DNA sequence.
When studying DNA, it is useful to identify repeated sequences within the DNA.

Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.

Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]

Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]


*/

// O(n) time | O(n) space where n is the length of s
const findRepeatedDnaSequences = (s) => {
  const seen = new Set();
  const output = new Set();
  let length = 10;
  for (let i = 0; i < s.length - length + 1; i++) {
    const subStr = s.slice(i, i + length);
    if (seen.has(subStr)) output.add(subStr);
    seen.add(subStr);
  }

  return Array.from(output);
};
