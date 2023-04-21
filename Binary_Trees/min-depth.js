/**
 * Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.
 */

// O(n) time | O(h) space where n is the number of nodes and h is the height of the tree
const minDepth = (root) => {
  const res = _minDepth(root);
  return res === Infinity ? 0 : res;
};
const _minDepth = (root) => {
  // base case if null return 0, if leaf return 1
  if (!root) return Infinity;
  if (!root.left && !root.right) return 1;
  return 1 + Math.min(_minDepth(root.left), _minDepth(root.right));
};
