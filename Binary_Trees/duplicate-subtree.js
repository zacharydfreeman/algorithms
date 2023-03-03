/*

Given the root of a binary tree, return all duplicate subtrees.

For each kind of duplicate subtrees, you only need to return the root node of any one of them.

Two trees are duplicate if they have the same structure with the same node values.

Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]

 */

// Approach: Serialize BT and put serialization into map (preorder traversal)
// O(n^2) | O(n) space where n is the number of nodes
const findDuplicateSubtrees = (root) => {
  // decalare output variable
  const output = [];
  // decalre map
  const map = {};
  // dfs on root
  dfs(root, output, map);
  // return output
  return output;
};

const dfs = (root, output, map) => {
  // if root is null serialize
  if (!root) return 'null';
  // declare s that will the serialization of the preorder
  const s = [
    root.val,
    dfs(root.left, output, map),
    dfs(root.right, output, map),
  ].join(',');
  // if s not in map initialize to empty array
  if (!(s in map)) map[s] = [];
  // map[s].length is 1, output.push(root). You only want to push once so check if length is 1
  if (map[s].length === 1) output.push(root);
  // then add root to map[s]
  map[s].push(root);
  // return string
  return s;
};
