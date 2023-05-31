/* 
Given the root of a binary tree, return the sum of values of nodes with an even-valued grandparent. If there are no nodes with an even-valued grandparent, return 0.

A grandparent of a node is the parent of its parent if it exists.

Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 18
Explanation: The red nodes are the nodes with even-value grandparent while the blue nodes are the even-value grandparents.

Input: root = [1]
Output: 0

*/

const sumEvenGrandparent = (root) => {
  if (!root) return 0;
  let queue = [[root, null, null]]; // node, parent, grandparent
  let sum = 0;
  while (queue.length) {
    const nextLevel = [];
    for (let [curr, par, grandpar] of queue) {
      if (grandpar && grandpar.val % 2 === 0) {
        sum += curr.val;
      }
      if (curr.right) nextLevel.push([curr.right, curr, par]);
      if (curr.left) nextLevel.push([curr.left, curr, par]);
    }
    queue = nextLevel;
  }
  return sum;
};

// O(n) time | O(h) space
const sumEvenGrandparent2 = (root) => {
  let total = 0;
  let dfs = (node, parent, gparent) => {
    if (!node) return;
    if (gparent) total += node.val;
    let isEven = node.val % 2 === 0;
    dfs(node.left, isEven, parent);
    dfs(node.right, isEven, parent);
  };
  dfs(root, false, false);
  return total;
};
