/* 
There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.

Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation:
Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.

*/

const eventualSafeNodes = (graph) => {
  const outbound = new Array(graph.length).fill(0);
  for (let i = 0; i < graph.length; i++) {
    outbound[i] += graph[i].length;
  }

  const newGraph = new Array(graph.length).fill().map(() => []);
  for (let i = 0; i < graph.length; i++) {
    const neighbors = graph[i];
    for (let nei of neighbors) {
      newGraph[nei].push(i);
    }
  }

  const stack = [];
  for (let i = 0; i < outbound.length; i++) {
    if (outbound[i] === 0) stack.push(i);
  }

  const output = [];

  while (stack.length) {
    const current = stack.pop();
    output.push(current);

    for (let nei of newGraph[current]) {
      outbound[nei]--;
      if (outbound[nei] === 0) stack.push(nei);
    }
  }

  return output.sort((a, b) => a - b);
};

const graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []];

console.log(eventualSafeNodes(graph));
