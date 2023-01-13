/*
Write a function that takes in a potentially invalvid Binary Search Tree and returns a boolean if the BST is valid

*/

class BST {
    construcot(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

// O(n) height | O(d) space where d is height of the tree
const validateBst = (tree, minVal = -Infinity, maxVal = Infinity) => {
    if (tree === null) return true;
    if (tree.value < minVal || tree.value >= maxVal) return false;
    // check if left is valid making a recursive call with tree.left, min val and the tree.value for max Val
    const isLeftValid = validateBst(tree.left, minVal, tree.value);
    // check if right is valid by making recursive call with right subtree, the tree.value for the min value and max value
    const isRightValid = validateBst(tree.right, tree.value, maxVal);
    return isLeftValid && isRightValid;
}
