/**
 * Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

Search for a node to remove.
If the node is found, delete the node.
 */

// O(log(n)) time | O(1) space
const deleteNode = (root, key) => {
  if (!root) return null;
  if (root.val < key) {
    // recursively call function on right subtree
    root.right = deleteNode(root.right, key);
  } else if (root.val > key) {
    // recursivelly call function on left subtree
    root.left = deleteNode(root.left, key);
  } else {
    // the case where we found the node to delete
    if (!root.left) {
      // if there is no left node, return right node
      return root.right;
    } else if (!root.right) {
      // if there is no right node, return left node
      return root.left;
    } else {
      // we need to find the min in the right subtree and replace
      const minNode = findMin(root.right);
      // change the current's root val to the min val
      root.val = minNode.val;
      // remove the minValnode
      root.right = deleteNode(root.right, minNode.val);
    }
  }
  return root;
};

const findMin = (root) => {
  let current = root;
  while (current && current.left) {
    current = current.left;
  }
  return current;
};
