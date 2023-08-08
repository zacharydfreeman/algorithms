/* 
Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]

Input: root = [1,2,3]
Output: [1,3]
*/

// O(n) time | O(n) space
const largestValues = (root) => {
  if (!root) return [];
  let queue = [root];
  const output = [];
  while (queue.length) {
    const nextLevel = [];
    let max = -Infinity;
    for (let current of queue) {
      max = Math.max(max, current.val);
      if (current.left) nextLevel.push(current.left);
      if (current.right) nextLevel.push(current.right);
    }
    queue = nextLevel;
    output.push(max);
  }
  return output;
};
