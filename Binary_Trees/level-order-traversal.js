/*
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).
*/

// Approach: BFS using current level instead of a queue
// O(n) time | O(n) space
const levelOrder = (root) => {
  // if root is null return empty array
  if (!root) return [];
  // declare output array and initialize current level
  const output = [];
  let currentLevel = [root];
  while (currentLevel.length) {
    // put the values into output from current level
    const length = currentLevel.length;
    const newLevel = [];
    const vals = [];
    for (let i = 0; i < length; i++) {
      const current = currentLevel[i];
      vals.push(current.val);
      if (current.left) newLevel.push(current.left);
      if (current.right) newLevel.push(current.right);
    }
    // push vals into output
    output.push(vals);
    // update current level
    currentLevel = newLevel;
  }
  return output;
};

// Approach: BFS
// O(n) time | O(n) space where n is the number of nodes and h is the height of the tree.
// We are ignoring the additional time from shift() in javascript
const levelOrder2 = (root) => {
  // if root is null return empty array
  if (!root) return [];
  // declare output array and queue initialzed with root node and level of 0
  const output = new Array();
  const queue = [[root, 0]];

  while (queue.length) {
    // get currentNode
    const [currentNode, currentLevel] = queue.shift();
    // update output array
    if (output[currentLevel] === undefined) output[currentLevel] = [];
    output[currentLevel].push(currentNode.val);

    // push left into queue first
    if (currentNode.left) queue.push([currentNode.left, currentLevel + 1]);
    if (currentNode.right) queue.push([currentNode.right, currentLevel + 1]);
  }

  return output;
};
