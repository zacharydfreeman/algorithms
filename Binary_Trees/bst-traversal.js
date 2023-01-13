/*
Write three functions that take in a Binary Search Tree and an empty array, traverse the BST, add its nodes'
values to the input array and return that array. The three functions should traverse the BST using the
in-order, pre-order and post-order tree traversal techniques

tree =    10
       /     \
      5       15
    /  \        \
   2    5        22
  /
1

array = []

inOrder = [1, 2, 5, 5, 10, 15, 22]
preOrder = [10, 5, 2, 1, 5, 15, 22]
postOrder = [1, 2, 5, 5, 22, 15, 10]
*/

// left, self, right
// O(n) time | O(n) space
const inOrderTraverse = (tree, array) => {
    // base case
    if (tree === null) return array;
    // go down left subtree
    inOrderTraverse(tree.left, array);
    // push self
    array.push(tree.value);
    // go down right subtree
    inOrderTraverse(tree.right, array);
    return array;
}

// self, left, right
// O(n) time | O(n) space
const preOrderTraverse = (tree, array) => {
    // base case
    if (tree === null) return array;
    // push self
    array.push(tree.value);
    // go down left subtree
    preOrderTraverse(tree.left, array);
    // go down right subtree
    preOrderTraverse(tree.right, array);
    return array;
}

// left, right self
const postOrderTraverse = (tree, array) => {
    // base case
    if (tree === null) return array;
    // go down left subtree
    postOrderTraverse(tree.left, array);
    // go down righ subtree
    postOrderTraverse(tree.right, array);
    // push self
    array.push(tree.value);
    return array;
}
