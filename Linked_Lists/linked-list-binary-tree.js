/* 
Given a binary tree root and a linked list with head as the first node. 

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  

Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true

Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.

*/

// O(n * m) time | O(n) space
const isSubPath = (head, root) => {
  let queue = [root];
  while (queue.length) {
    const nextLevel = [];
    for (let current of queue) {
      if (current.val === head.val) {
        // if current.val = head.val run dfs and return true if dfs returns true
        if (dfs(current, head)) return true;
      }
      if (current.left) nextLevel.push(current.left);
      if (current.right) nextLevel.push(current.right);
    }
    queue = nextLevel;
  }
  return false;
};

const dfs = (treeNode, listNode) => {
  // if listNode is null return
  if (!listNode) return true;
  // if tree node is null or tree val != list val return false
  if (!treeNode || treeNode.val !== listNode.val) return false;

  return (
    dfs(treeNode.left, listNode.next) || dfs(treeNode.right, listNode.next)
  );
};
