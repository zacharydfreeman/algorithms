/* 
Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).

If two nodes are in the same row and column, the order should be from left to right.

Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]

Input: root = [3,9,8,4,0,1,7]
Output: [[4],[9],[3,0,1],[8],[7]]

Input: root = [3,9,8,4,0,1,7,null,null,null,2,5]
Output: [[4],[9,5],[3,0,1],[8,2],[7]]
*/

// O(n) time | O(n) space
const verticalOrder = (root) => {
  if (!root) return [];
  const levels = {};
  let queue = [[root, 0]];
  let minCol = Infinity;
  let maxCol = -Infinity;
  while (queue.length) {
    const nextLevel = [];
    for (let [current, col] of queue) {
      minCol = Math.min(minCol, col);
      maxCol = Math.max(maxCol, col);
      if (!(col in levels)) levels[col] = [];
      levels[col].push(current.val);
      if (current.left) nextLevel.push([current.left, col - 1]);
      if (current.right) nextLevel.push([current.right, col + 1]);
    }
    queue = nextLevel;
  }
  const output = [];
  for (let i = minCol; i <= maxCol; i++) {
    output.push(levels[i]);
  }
  return output;
};
