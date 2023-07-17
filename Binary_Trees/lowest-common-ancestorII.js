/* 
Given the root of a binary tree, return the lowest common ancestor (LCA) of two given nodes, p and q. If either node p or q does not exist in the tree, return null. All values of the nodes in the tree are unique.

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a binary tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)". A descendant of a node x is a node y that is on the path from node x to some leaf node.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5. A node can be a descendant of itself according to the definition of LCA.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: null
Explanation: Node 10 does not exist in the tree, so return null.

*/

// O(n) time | O(h) space
const lowestCommonAncestor = (root, p, q) => {
  let ans = null;
  const dfs = (current) => {
    if (!current) return 0;

    const left = dfs(current.left);
    const right = dfs(current.right);

    let currentCount = 0;

    if (left === 2 || right === 2) return;

    currentCount += left + right;
    if (current === p || current === q) currentCount++;
    if (currentCount === 2) {
      ans = current;
    }
    return currentCount;
  };
  dfs(root);
  return ans;
};
