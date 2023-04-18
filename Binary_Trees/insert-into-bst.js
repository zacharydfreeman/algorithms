/**
 * You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]

Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]
 */

// O(log(n)) time | O(1 space)
const insertIntoBST = (root, val) => {
  const newNode = new TreeNode(val);
  if (!root) return newNode;
  let current = root;
  while (current) {
    if (val > current.val) {
      // go right
      if (!current.right) {
        current.right = newNode;
        return root;
      } else {
        current = current.right;
      }
    } else {
      // go left
      if (!current.left) {
        current.left = newNode;
        return root;
      } else {
        current = current.left;
      }
    }
  }
};
