/**
 * Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).
 * 
 * Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]

Input: root = [1]
Output: [[1]]

Input: root = []
Output: []
 */

// Approach: BFS
// O(n) time | O(n) space where n is the number of nodes
const levelOrderBottom = (root) => {
  if (!root) return [];
  const output = [];
  let currentLevel = [root];
  while (currentLevel.length) {
    const newLevel = [];
    const outputLevel = [];
    for (let i = 0; i < currentLevel.length; i++) {
      const current = currentLevel[i];
      outputLevel.push(current.val);
      if (current.left) newLevel.push(current.left);
      if (current.right) newLevel.push(current.right);
    }
    output.push(outputLevel);
    currentLevel = newLevel;
  }
  return output.reverse();
};
