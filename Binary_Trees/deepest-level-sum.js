/* 
Given the root of a binary tree, return the sum of values of its deepest leaves.

Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15

Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 19

*/

// O(n) time | O(w) space where n is the number of nodes and w is the width of the tree
const deepestLeavesSum = (root) => {
  if (!root) return 0;
  let queue = [root];
  let levelSum = 0;
  while (queue.length) {
    const nextLevel = [];
    let nextSum = 0;
    for (let node of queue) {
      nextSum += node.val;
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }
    queue = nextLevel;
    levelSum = nextSum;
  }
  return levelSum;
};
