/* 
Given the root of a binary tree, replace the value of each node in the tree with the sum of all its cousins' values.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Return the root of the modified tree.

Note that the depth of a node is the number of edges in the path from the root node to it.

Input: root = [5,4,9,1,10,null,7]
Output: [0,0,0,7,7,null,11]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 5 does not have any cousins so its sum is 0.
- Node with value 4 does not have any cousins so its sum is 0.
- Node with value 9 does not have any cousins so its sum is 0.
- Node with value 1 has a cousin with value 7 so its sum is 7.
- Node with value 10 has a cousin with value 7 so its sum is 7.
- Node with value 7 has cousins with values 1 and 10 so its sum is 11.

Input: root = [3,1,2]
Output: [0,0,0]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 3 does not have any cousins so its sum is 0.
- Node with value 1 does not have any cousins so its sum is 0.
- Node with value 2 does not have any cousins so its sum is 0.
*/

// O(n) time | O(n) space
const replaceValueInTree = (root) => {
  let queue = [[root, root.val]];
  let currentSum = root.val;
  while (queue.length) {
    let nextSum = 0;
    const nextLevel = [];
    for (let [node, sum] of queue) {
      const leftVal = node.left ? node.left.val : 0;
      const rightVal = node.right ? node.right.val : 0;
      node.val = currentSum - sum;
      if (node.left) {
        nextSum += node.left.val;
        nextLevel.push([node.left, leftVal + rightVal]);
      }
      if (node.right) {
        nextSum += node.right.val;
        nextLevel.push([node.right, leftVal + rightVal]);
      }
    }
    currentSum = nextSum;
    queue = nextLevel;
  }
  return root;
};
