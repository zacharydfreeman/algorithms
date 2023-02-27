/*

Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]

*/

// Approach: BFS

const zigzagLevelOrder = (root) => {
  // if root is null return empty array
  if (!root) return [];
  // declare output variable
  const output = [];
  // declare queue with root and level
  const queue = [root];

  while (queue.length) {
    // declare level array
    const level = [];
    // grab current length of queue for for loop
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      // get current node
      const current = queue.shift();
      level.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    // reverse level if at odd level
    if (output.length % 2) level.reverse();
    output.push(level);
  }

  return output;
};

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const root = new Node(3);
const nine = new Node(9);
const twenty = new Node(20);
const fifteen = new Node(15);
const seven = new Node(7);

root.left = nine;
root.right = twenty;
twenty.left = fifteen;
twenty.right = seven;

console.log(zigzagLevelOrder(root));
