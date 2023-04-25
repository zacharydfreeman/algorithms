/*

Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

*/

// O(n) time | O(d) space where n is the number of nodes and d is the diameter of the tree
const rightSideView = (root) => {
  // if root is null return empty array
  if (!root) return [];
  // declare output array and current level
  const output = [];
  let currentLevel = [root];
  // while there are nodes in the currentLevel
  while (currentLevel.length) {
    const length = currentLevel.length;
    const newLevel = [];
    for (let i = 0; i < length; i++) {
      const current = currentLevel[i];
      // push val at first index into output
      if (i === 0) output.push(current.val);
      // push right first if it exists
      if (current.right) newLevel.push(current.right);
      if (current.left) newLevel.push(current.left);
    }
    // update current level
    currentLevel = newLevel;
  }
  // return output
  return output;
};
