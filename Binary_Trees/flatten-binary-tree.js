/* 
Given the root of a binary tree, flatten the tree into a "linked list":

The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.

Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]

Input: root = []
Output: []

Input: root = [0]
Output: [0]

*/

// Approach: Morris Travel
// O(n) time | O(1) space
const flatten = (root) => {
  if (!root) return root;

  let current = root;
  while (current) {
    // if there is left subtree find the right most node and update pointers
    if (current.left) {
      // find the right most node in the left subtree
      let rightMost = current.left;
      while (rightMost.right) {
        rightMost = rightMost.right;
      }
      // set rightmost node right pointer to right subtree of current node
      rightMost.right = current.right;
      // set left subtree to right subtree of current
      current.right = current.left;
      // set current left subtree to null
      current.left = null;
    }
    // update pointer
    current = current.right;
  }
  return root;
};

// Approach: Stack
// O(n) time | O(d) space where n is the number of nodes and d is the diameter of the tree
const flatten2 = (root) => {
  if (!root) return root;
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    // grab references to left and right
    const right = current.right;
    const left = current.left;
    // if right exists, push to stack
    if (right) stack.push(right);
    // if left doesnt exist then we need to pop from stack
    if (!left && stack.length) {
      const node = stack.pop();
      current.right = node;
      // push node back onto stack
      stack.push(node);
    } else {
      current.right = left;
    }
    // update
    current.left = null;
    if (left) stack.push(left);
  }
  return root;
};

// Approach: Get preorder traversal and then modify pointers
// O(n) time | O(n) space
const flatten3 = (root) => {
  if (!root) return null;
  const preorder = [];
  dfs(root, preorder);
  for (let i = 0; i < preorder.length; i++) {
    const node = preorder[i];
    if (i === preorder.length - 1) {
      node.left = null;
      node.right = null;
      continue;
    }
    const nextNode = preorder[i + 1];
    node.right = nextNode;
    node.left = null;
  }
  return preorder[0];
};

const dfs = (root, preorder) => {
  if (!root) return;
  preorder.push(root);
  dfs(root.left, preorder);
  dfs(root.right, preorder);
};
