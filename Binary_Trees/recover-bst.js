/**
 * You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.
 * 
 * Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.

Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
 */

// Approach: Inorder traversal
// O(n) time | O(h) space
const recoverTree = (root) => {
  let small = null;
  let big = null;
  let prev = null;
  let inorder = function (r) {
    if (r == null) return;
    inorder(r.left);
    if (prev && prev.val > r.val) {
      small = r;
      if (big) return;
      big = prev;
    }
    prev = r;
    inorder(r.right);
    return;
  };
  inorder(root);
  [small.val, big.val] = [big.val, small.val];
};

// Approach: Inorder traversal
// O(n) time | O(n) space
const recoverTree2 = (root) => {
  const values = [];
  inorder(root, values);
  let small = null;
  let big = null;

  for (let i = 1; i < values.length; i++) {
    if (values[i].val < values[i - 1].val) {
      small = values[i];
      if (big) continue;
      big = values[i - 1];
    }
  }

  [small.val, big.val] = [big.val, small.val];
};

const inorder = (root, values) => {
  if (!root) return;
  inorder(root.left, values);
  values.push(root);
  inorder(root.right, values);
};
