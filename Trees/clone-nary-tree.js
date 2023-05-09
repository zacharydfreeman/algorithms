/**
 * Given a root of an N-ary tree, return a deep copy (clone) of the tree.

Each node in the n-ary tree contains a val (int) and a list (List[Node]) of its children.

class Node {
    public int val;
    public List<Node> children;
}
Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

 

Example 1:



Input: root = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
Example 2:



Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 */

// O(n) time | O(n) space where n is the number of nodes in the tree
const cloneTree = (root) => {
  // base case if root is null
  if (!root) return null;
  // create a deep copy of node
  const clone = new Node(root.val, []);
  for (let child of root.children) {
    // recursively call function on child and push into children array of clone
    clone.children.push(cloneTree(child));
  }
  // return clone
  return clone;
};
