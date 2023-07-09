/* 
Given the root of a binary search tree and a node p in it, return the in-order successor of that node in the BST. If the given node has no in-order successor in the tree, return null.

The successor of a node p is the node with the smallest key greater than p.val.

Input: root = [2,1,3], p = 1
Output: 2
Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.

Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is null.

*/

// O(h) time | O(1) space
const inorderSuccessor = (root, p) => {
  let current = root;
  let successor = null;

  while (current) {
    if (p.val >= current.val) {
      current = current.right;
    } else {
      successor = current;
      current = current.left;
    }
  }

  return successor;
};

const inorderSuccessor2 = (root, p) => {
  const inorder = [];
  dfs(root, inorder);
  const idx = inorder.indexOf(p);
  return inorder[idx + 1] || null;
};

const dfs = (root, inorder) => {
  if (!root) return;
  dfs(root.left, inorder);
  inorder.push(root);
  dfs(root.right, inorder);
};
