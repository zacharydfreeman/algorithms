/*
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

The lowest common ancestor is defined between two
nodes p and q as the lowest node in T that has both p and q as descendants
(where we allow a node to be a descendant of itself).

     a
   /    \
  b      c
 / \      \
d   e      f
   / \
   g  h

lowestCommonAncestor(a, d, h); // b
lowestCommonAncestor(a, d, g); // b
lowestCommonAncestor(a, g, c); // a
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Approach: Start at root node and keep track of the tree info of how many descendants it has
// and return first time you have both decendants
// O(n) time | O(h) space where n is number of nodes and h is height of tree
const lowestCommonAncestor = (root, p, q) => {
  // recursive helper function will return an object that will have the lowest common ancestor
  // and the number of descendants in its subtree
  return _getLowestCommonAncestor(root, p, q).lowestCommonAncestor;
};

const _getLowestCommonAncestor = (current, p, q) => {
  // base case if current is null
  if (current === null)
    return { lowestCommonAncestor: null, numOfDescendants: 0 };
  // declare number of descendants to 0
  let currentNumOfDescendants = 0;
  // recursive call to left and right
  const leftTreeInfo = _getLowestCommonAncestor(current.left, p, q);
  const rightTreeInfo = _getLowestCommonAncestor(current.right, p, q);
  // if left has common ancestor return, if right has common ancestor return
  if (leftTreeInfo.lowestCommonAncestor !== null) return leftTreeInfo;
  if (rightTreeInfo.lowestCommonAncestor !== null) return rightTreeInfo;
  // neither had lowest common ancestor so update num of descendants
  currentNumOfDescendants +=
    leftTreeInfo.numOfDescendants + rightTreeInfo.numOfDescendants;
  // check to see if current node is a descendant
  if (current === p || current === q) currentNumOfDescendants += 1;
  // declare lowest common ancestor to be null or current if num of descendants is 2
  let lowestCommonAncestor = currentNumOfDescendants === 2 ? current : null;
  return {
    lowestCommonAncestor: lowestCommonAncestor,
    numOfDescendants: currentNumOfDescendants,
  };
};

// Approach: Brute force approach would be to find the path to both nodes from root and then return
// first intance of overlap between the paths
// O(n) time | O(n) space
const lowestCommonAncestor2 = (root, p, q) => {
  // find paths to p and q using dfs recursive helper function
  const pathP = dfs(root, p);
  const pathQ = dfs(root, q);
  // put path p into a set for cosntant look up time
  const pathPSet = new Set(pathP);
  // loop through path Q and find first instance of overlap and return that node
  for (let node of pathQ) {
    if (pathPSet.has(node)) return node;
  }
};

const dfs = (currentNode, targetNode) => {
  // if current node is null then return null because there is no path
  if (currentNode === null) return null;
  // if current = target then return array with target node
  if (currentNode === targetNode) return [targetNode];
  // make recursive call to left to see if there is a path. If so, add current node to it and return it
  const leftPath = dfs(currentNode.left, targetNode);
  if (leftPath !== null) {
    leftPath.push(currentNode);
    return leftPath;
  }
  // make recursive call to right to see if there is a path. If so, add current node to it and return it
  const rightPath = dfs(currentNode.right, targetNode);
  if (rightPath !== null) {
    rightPath.push(currentNode);
    return rightPath;
  }
  // if path doesnt exist in either right or left return null
  return null;
};
