/*
Given the root of a binary tree, determine if it is a complete binary tree.

In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.

Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.

      1
     / \
   2    3
  / \    \
5    4    7

*/

// O(n) time | O(n) space
const isCompleteTree = (root) => {
  let currentLevel = [root];
  let foundNull = false;
  while (currentLevel.length) {
    const newLevel = [];
    for (let i = 0; i < currentLevel.length; i++) {
      const current = currentLevel[i];
      if (foundNull && current) return false;
      if (!current) foundNull = true;
      if (current) {
        newLevel.push(current.left);
        newLevel.push(current.right);
      }
    }
    currentLevel = newLevel;
  }
  return true;
};

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
