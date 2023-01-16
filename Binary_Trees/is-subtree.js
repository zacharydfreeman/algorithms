/*

Given the roots of two binary trees root and subRoot, return true if there is a subtree
of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this
node's descendants. The tree tree could also be considered as a subtree of itself.

*/

// Approach: Recursively
// O(n*m) time | O(max(n, m)) where n and m are the sizes of the trees
const isSubtree = (root, subRoot) => {
    // base case if subRoot is null return true. Null node is always a subtree
    if (subRoot === null) return true;
    // if you traversed all the way through root and dont find subroot then return false
    if (root === null) return false;
    // check to see if same tree at current nodes
    if (isSameTree(root, subRoot)) return true
    // recursively call function on left and right nodes. If one is true, return true
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

// Approach: Iteratively
// O(n*m) time | O(max(n, m)) where n and m are the sizes of the trees
const isSubtree2 = (root, subRoot) => {
    // dfs
    const stack = [root];
    while (stack.length) {
        const current = stack.pop();
        if (current.val === subRoot.val && isSameTree(current, subRoot)) return true;
        if (current.left) stack.push(current.left);
        if (current.right) stack.push(current.right);
    }
    return false;
}

const isSameTree = (p, q) => {
    // if both trees are null then return true
    if (p === null && q === null) return true;
    // if one of them is false return false
    if (p === null || q === null) return false;
    // if values do not equal return false
    if (p.val !== q.val) return false;

    // check if left is same
    const isLeftSame = isSameTree(p.left, q.left);
    // check if right is same
    const isRightSame = isSameTree(p.right, q.right);

    return isLeftSame && isRightSame;
}
