/* 
Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

Input: root = [3,1,4,null,2], k = 1
Output: 1

Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

*/

class TreeInfo {
  constructor(numOfNodesGreater, latestNode) {
    this.numOfNodesVisited = 0;
    this.latestNodeValue = -1;
  }
}

// O(n) time | O(h) space
const kthSmallest = (root, k) => {
  const treeInfo = new TreeInfo(0, -1);
  dfs(root, k, treeInfo);
  return treeInfo.latestNodeValue;
};

const dfs = (root, k, treeInfo) => {
  if (!root) return;
  if (treeInfo.numOfNodesVisited === k) return;

  dfs(root.left, k, treeInfo);
  if (treeInfo.numOfNodesVisited < k) {
    treeInfo.numOfNodesVisited++;
    treeInfo.latestNodeValue = root.val;
  }
  dfs(root.right, k, treeInfo);
};

// O(n) time | O(n) space
const kthSmallest2 = (root, k) => {
  const values = [];
  inOrderTraversal(root, values);
  return values[k - 1];
};

const inOrderTraversal = (root, values) => {
  if (!root) return;
  inOrderTraversal(root.left, values);
  values.push(root.val);
  inOrderTraversal(root.right, values);
};
