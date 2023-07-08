/* 
Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).

Each node will have a reference to its parent node. The definition for Node is below:

class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.

Input: root = [1,2], p = 1, q = 2
Output: 1
*/

// O(n) time | O(h) space
const lowestCommonAncestor = (p, q) => {
  const visited = new Set([p, q]);
  const stack = [p, q];
  while (stack.length) {
    const current = stack.pop();
    if (current.parent && visited.has(current.parent)) return current.parent;
    if (current.parent) {
      visited.add(current.parent);
      stack.push(current.parent);
    }
  }
};
