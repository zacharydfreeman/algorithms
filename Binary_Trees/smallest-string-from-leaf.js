/* 
You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.

Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

As a reminder, any shorter prefix of a string is lexicographically smaller.

For example, "ab" is lexicographically smaller than "aba".
A leaf of a node is a node that has no children.

Input: root = [0,1,2,3,4,3,4]
Output: "dba"

Input: root = [25,1,3,1,3,0,2]
Output: "adz"

Input: root = [2,2,1,null,1,0,null,0]
Output: "abc"

*/

// O(n) time | O(n) space
const smallestFromLeaf = (root) => {
  let string = null;
  const dfs = (root, str) => {
    if (!root) return;
    const nextStr = String.fromCharCode(root.val + 97) + str;
    if (!root.left && !root.right) {
      if (nextStr < string || string === null) string = nextStr;
      return;
    }
    dfs(root.left, nextStr);
    dfs(root.right, nextStr);
  };
  dfs(root, '');
  return string;
};

// Approach: Backtracking
// O(n) time | O(n) space
const smallestFromLeaf2 = (root) => {
  let ans = '';
  const dfs = (root, string) => {
    if (!root) return;
    if (!root.left && !root.right) {
      const nextString = [...string, String.fromCharCode(root.val + 97)]
        .reverse()
        .join('');
      if (nextString < ans || ans === '') ans = nextString;
      return;
    }
    string.push(String.fromCharCode(root.val + 97));
    dfs(root.left, string);
    dfs(root.right, string);
    string.pop();
  };
  dfs(root, []);
  return ans;
};
