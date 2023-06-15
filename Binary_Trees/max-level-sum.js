/* 
Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.

Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
*/

// O(n) time | O(n) space
const maxLevelSum = (root) => {
  let level = 1;
  let maxVal = -Infinity;
  let maxLevel = 1;

  let queue = [root];
  while (queue.length) {
    let total = 0;
    const nextLevel = [];
    for (let node of queue) {
      total += node.val;
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }
    if (total > maxVal) {
      maxVal = total;
      maxLevel = level;
    }
    queue = nextLevel;
    level++;
  }
  return maxLevel;
};
