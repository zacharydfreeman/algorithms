/*
Given a string s, partition s such that every 
substring
 of the partition is a 
palindrome
. Return all possible palindrome partitioning of s.

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Input: s = "a"
Output: [["a"]]

 */

// Approach: Backtracking
// O(n*2^n) time | O(n) space
const partition = (s) => {
  const output = [];
  const dfs = (start, strings) => {
    if (start >= s.length) {
      output.push([...strings]);
    }
    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        // push to strings array
        strings.push(s.slice(start, end + 1));
        dfs(end + 1, strings);
        // backtrack
        strings.pop();
      }
    }
  };
  dfs(0, []);
  return output;
};

const isPalindrome = (s, start, end) => {
  while (start <= end) {
    if (s[start++] !== s[end--]) return false;
  }
  return true;
};
