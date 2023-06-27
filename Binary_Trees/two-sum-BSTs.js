/* 
Given the roots of two binary search trees, root1 and root2, return true if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer target.

Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
Explanation: 2 and 3 sum up to 5.

Input: root1 = [0,-10,10], root2 = [5,1,7,0,2], target = 18
Output: false

*/

// O(m + n) time | O(m + n) space
const twoSumBSTs = (root1, root2, target) => {
  const set1 = new Set();
  const set2 = new Set();
  dfs(root1, set1);
  dfs(root2, set2);

  for (let value of set1) {
    if (set2.has(target - value)) return true;
  }
  return false;
};

const dfs = (root, set) => {
  if (!root) return;
  dfs(root.left, set);
  set.add(root.val);
  dfs(root.right, set);
};
