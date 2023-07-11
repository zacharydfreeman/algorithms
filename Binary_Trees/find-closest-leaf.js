/* 
Given the root of a binary tree where every node has a unique value and a target integer k, return the value of the nearest leaf node to the target k in the tree.

Nearest to a leaf means the least number of edges traveled on the binary tree to reach any leaf of the tree. Also, a node is called a leaf if it has no children.

Input: root = [1,3,2], k = 1
Output: 2
Explanation: Either 2 or 3 is the nearest leaf node to the target of 1.

Input: root = [1], k = 1
Output: 1
Explanation: The nearest leaf node is the root node itself.

Input: root = [1,2,3,4,null,null,null,5,null,6], k = 2
Output: 3
Explanation: The leaf node with value 3 (and not the leaf node with value 6) is nearest to the node with value 2.

*/

// O(n) time | O(n) space
const findClosestLeaf = (root, k) => {
  const addParents = (curr, par) => {
    if (!curr) return;
    curr.parent = par;
    addParents(curr.left, curr);
    addParents(curr.right, curr);
  };
  addParents(root, null);
  let start = null;
  const dfs = (curr) => {
    if (!curr) return;
    if (curr.val === k) {
      start = curr;
      return;
    }
    dfs(curr.left);
    dfs(curr.right);
  };
  dfs(root);
  let queue = [start];
  const visited = new Set();
  while (queue.length) {
    const nextLevel = [];
    for (let node of queue) {
      visited.add(node);
      if (!node.left && !node.right) return node.val;
      if (node.left && !visited.has(node.left)) nextLevel.push(node.left);
      if (node.right && !visited.has(node.right)) nextLevel.push(node.right);
      if (node.parent && !visited.has(node.parent)) nextLevel.push(node.parent);
    }
    queue = nextLevel;
  }
  return null;
};
