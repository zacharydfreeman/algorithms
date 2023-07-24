/*
Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. Return the output in any order.

Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
*/

const letterCasePermutation = (s) => {
  const output = [];
  const numbers = '0123456789';
  const dfs = (idx, string) => {
    if (idx === s.length) {
      output.push(string);
      return;
    }

    const char = s[idx];
    if (numbers.includes(char)) {
      dfs(idx + 1, string + char);
    } else {
      dfs(idx + 1, string + char.toUpperCase());
      dfs(idx + 1, string + char.toLowerCase());
    }
  };
  dfs(0, '');
  return output;
};
