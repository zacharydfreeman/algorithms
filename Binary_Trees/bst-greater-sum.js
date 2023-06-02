/* 
Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]


*/

// O(n) time  | O(h) space
const bstToGst = (root) => {
  let sum = 0;
  const dfs = (root) => {
    if (!root) return;
    const { val, left, right } = root;
    dfs(right);
    root.val += sum;
    sum += val;
    dfs(left);
  };
  dfs(root);
  return root;
};
