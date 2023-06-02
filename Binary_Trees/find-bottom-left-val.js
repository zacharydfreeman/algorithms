/* 
Given the root of a binary tree, return the leftmost value in the last row of the tree.

Input: root = [2,1,3]
Output: 1

Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7

*/

// O(n) time | O(n) space
const findBottomLeftValue = (root) => {
  if (!root) return root;
  let queue = [root];
  let leftMost = root;
  while (queue.length) {
    const nextLevel = [];
    for (let curr of queue) {
      if (curr.left) nextLevel.push(curr.left);
      if (curr.right) nextLevel.push(curr.right);
    }
    queue = nextLevel;
    if (queue.length) leftMost = queue[0];
  }
  return leftMost.val;
};
