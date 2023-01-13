/*
Write a function that take in Binary Tree (where nodes have an additional pointer to their parent node)
as well as a node contained in that tree and return the given node's successor.

A node's successor is the next node to be visited (immediately after the given node)
when traversing its tree using the in-order tree traversal technique
*/

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

// Approach: the next node in an inorder traversal is the right subtree left most node
// If the right subtree doesnt exist then the next node in an inorder traversal if the first ancestor node
// that the current node is not a right child of OR null if no such ancestor node exists
// O(n) time | O(1) space. In worst case O(n) time, in average case O(h) time
const findSuccessor = (tree, node) => {
    // check to see if node.right exists, if it does get left most node
    if (node.right !== null) {
        return getLeftMostNode(node.right);
    }
    // if node.right === null then you want to check the ancestors
    return getValidAncestor(node);
}

const getLeftMostNode = (node) => {
    let current = node;
    while (current.left !== null) {
        current = current.left;
    }
    return current;
}

const getValidAncestor = (node) => {
    let current = node;
    // keep traversing up if current is a right child of parent
    while(current.parent !== null && current === current.parent.right) {
        current = current.parent;
    }
    return current.parent;
}

// Approach: do an in order traversal and put nodes in array.
// Traverse through array and find node. Return next node in array
// Inorder traversal => left, self, right
// O(n) time | O(n) space
const findSuccessor2 = (tree, node) => {
    // declare array that will hold the inorder traversal nodes
    const inOrderTraversalValues = [];
    getInOrderTraversal(tree, inOrderTraversalValues); // recursive traversal
    // get index of node
    let idx = inOrderTraversalValues.indexOf(node);
    return idx === inOrderTraversalValues.length - 1 ? null : inOrderTraversalValues[idx + 1];
}

const getInOrderTraversal = (node, values) => {
    if (node === null) return;
    getInOrderTraversal(node.left, values);
    values.push(node);
    getInOrderTraversal(node.right, values);
}
