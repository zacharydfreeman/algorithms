/* 
You are given a string s representing a list of words. Each letter in the word has one or more options.

If there is one option, the letter is represented as is.
If there is more than one option, then curly braces delimit the options. For example, "{a,b,c}" represents options ["a", "b", "c"].
For example, if s = "a{b,c}", the first character is always 'a', but the second character can be 'b' or 'c'. The original list is ["ab", "ac"].

Return all words that can be formed in this manner, sorted in lexicographical order.

Input: s = "{a,b}c{d,e}f"
Output: ["acdf","acef","bcdf","bcef"]

Input: s = "abcd"
Output: ["abcd"]

*/

// Approach: Backtracking
// O(n * 3^n) time | O(n * 3^n) space
const expand = (s) => {
  const output = [];

  const dfs = (idx, s, currString) => {
    if (idx >= s.length) {
      output.push(currString);
      return;
    }
    const char = s[idx];
    if (char !== '{') {
      dfs(idx + 1, s, currString + char);
    } else {
      const [chars, nextIdx] = getChars(idx, s);
      for (let char of chars) {
        dfs(nextIdx, s, currString + char);
      }
    }
  };
  dfs(0, s, '');
  return output;
};

const getChars = (idx, s) => {
  const chars = [];
  let nextIdx;
  for (let i = idx + 1; i < s.length; i++) {
    if (s[i] === '}') {
      nextIdx = i + 1;
      break;
    }
    if (s[i] === ',') continue;
    chars.push(s[i]);
  }
  chars.sort((a, b) => a.localeCompare(b));
  return [chars, nextIdx];
};
