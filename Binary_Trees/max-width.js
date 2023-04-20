/**
 * 
 * Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.


 */
// Approach: Modified BFS
// O(n) time | O(h) space where n is length of nodes and h is height of the tree
const widthOfBinaryTree = (root) => {
  if (!root) return 0;
  let currentLevel = [[root, 0]];
  let max = 0;
  while (currentLevel.length) {
    // determine max
    const [firstNode, firstIdx] = currentLevel[0];
    const [lastNode, lastIdx] = currentLevel[currentLevel.length - 1];
    max = Math.max(max, lastIdx - firstIdx + 1);
    // update current level
    const newLevel = [];
    for (let i = 0; i < currentLevel.length; i++) {
      const [currentNode, currentIdx] = currentLevel[i];
      if (currentNode.left) {
        newLevel.push([currentNode.left, 2 * currentIdx + 1]);
      }
      if (currentNode.right) {
        newLevel.push([currentNode.right, 2 * currentIdx + 2]);
      }
    }
    currentLevel = newLevel;
  }
  return max;
};

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const one = new Node(1);
const three = new Node(3);
const two = new Node(2);
const three2 = new Node(3);
const five = new Node(5);
const nine = new Node(9);

one.left = three;
one.right = two;
two.right = nine;
three.left = five;
three.right = three2;

console.log(widthOfBinaryTree(one));
