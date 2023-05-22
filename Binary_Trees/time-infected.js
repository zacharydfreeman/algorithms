/* 
You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start.

Each minute, a node becomes infected if:

The node is currently uninfected.
The node is adjacent to an infected node.
Return the number of minutes needed for the entire tree to be infected.

Input: root = [1,5,3,null,4,10,6,9,2], start = 3
Output: 4
Explanation: The following nodes are infected during:
- Minute 0: Node 3
- Minute 1: Nodes 1, 10 and 6
- Minute 2: Node 5
- Minute 3: Node 4
- Minute 4: Nodes 9 and 2
It takes 4 minutes for the whole tree to be infected so we return 4.

Input: root = [1], start = 1
Output: 0
Explanation: At minute 0, the only node in the tree is infected so we return 0.


*/

// O(n) time | O(n) space
const amountOfTime = (root, start) => {
  const [graph, startNode] = createGraph(root, start);
  const visited = new Set([start]);
  let queue = [startNode];
  let time = 0;
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      for (let nei of graph[current.val]) {
        if (visited.has(nei.val)) continue;
        visited.add(nei.val);
        nextLevel.push(nei);
      }
    }
    queue = nextLevel;
    if (queue.length) time++;
  }
  return time;
};

const createGraph = (root, start) => {
  const graph = {};
  const stack = [root];
  let startNode;
  while (stack.length) {
    const current = stack.pop();
    if (current.val === start) startNode = current;
    const val1 = current.val;
    if (!(val1 in graph)) graph[val1] = [];
    if (current.right) {
      const val2 = current.right.val;
      if (!(val2 in graph)) graph[val2] = [];
      graph[val1].push(current.right);
      graph[val2].push(current);
      stack.push(current.right);
    }
    if (current.left) {
      const val2 = current.left.val;
      if (!(val2 in graph)) graph[val2] = [];
      graph[val1].push(current.left);
      graph[val2].push(current);
      stack.push(current.left);
    }
  }
  return [graph, startNode];
};
