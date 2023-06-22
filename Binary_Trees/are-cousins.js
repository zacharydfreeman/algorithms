/* 
Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.

Input: root = [1,2,3,4], x = 4, y = 3
Output: false

Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true

Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false

*/

// O(n) time | O(n) space
const isCousins = (root, x, y) => {
  let queue = [[root, 0, null]];
  let xNode; // [parent, depth]
  let yNode;

  while (queue.length) {
    const nextLevel = [];
    for (let [node, depth, parent] of queue) {
      if (node.val === x) xNode = [parent, depth];
      if (node.val === y) yNode = [parent, depth];
      if (xNode != null && yNode != null)
        return xNode[0] !== yNode[0] && xNode[1] === yNode[1];
      if (node.left) nextLevel.push([node.left, depth + 1, node]);
      if (node.right) nextLevel.push([node.right, depth + 1, node]);
    }
    queue = nextLevel;
  }
};
