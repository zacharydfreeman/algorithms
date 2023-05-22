/*
Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.

You can return the answer in any order.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.

Input: root = [1], target = 1, k = 3
Output: []


*/

const distanceK = (root, target, k) => {
  // add parents
  const addParents = (curr, parent) => {
    if (!curr) return;
    if (curr) {
      curr.parent = parent;
      addParents(curr.left, curr);
      addParents(curr.right, curr);
    }
  };
  addParents(root, null);
  // dfs
  const visited = new Set();
  const output = [];
  const dfs = (curr, distance) => {
    if (!curr || visited.has(curr)) return;
    visited.add(curr);
    if (distance === 0) {
      output.push(curr.val);
      return;
    }
    dfs(curr.parent, distance - 1);
    dfs(curr.left, distance - 1);
    dfs(curr.right, distance - 1);
  };
  dfs(target, k);
  return output;
};

// O(n) time | O(n) space
const distanceK2 = (root, target, k) => {
  const graph = createGraph(root);
  const visited = new Set([target.val]);
  let queue = [target];
  let level = 0;
  while (k !== level) {
    const newLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      for (let nei of graph[current.val]) {
        if (visited.has(nei.val)) continue;
        visited.add(nei.val);
        newLevel.push(nei);
      }
    }
    level++;
    queue = newLevel;
  }
  const output = [];
  for (let node of queue) {
    output.push(node.val);
  }
  return output;
};

const createGraph = (root) => {
  const graph = {};
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    const val1 = current.val;
    if (!(val1 in graph)) graph[val1] = [];
    if (current.right) {
      const val2 = current.right.val;
      if (!(val2 in graph)) graph[val2] = [];
      graph[val1].push(current.right);
      graph[val2].push(current);
      stack.push(current.right);
    }
    if (current.left) {
      const val2 = current.left.val;
      if (!(val2 in graph)) graph[val2] = [];
      graph[val1].push(current.left);
      graph[val2].push(current);
      stack.push(current.left);
    }
  }
  return graph;
};
