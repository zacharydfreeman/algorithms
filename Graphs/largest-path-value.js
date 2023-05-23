/* 
There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.

You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.

A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.

Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.

Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
Output: 3
Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).

Input: colors = "a", edges = [[0,0]]
Output: -1
Explanation: There is a cycle from 0 to 0.

*/

// Approach: Topological Sort using Kahn's
// O(m + n) time | O(m + n) space
const largestPathValue = (colors, edges) => {
  // create graph
  const graph = createGraph(colors.length, edges);
  // find incoming edges
  const inboundEdges = new Array(colors.length).fill(0);
  for (let [from, to] of edges) {
    inboundEdges[to]++;
  }
  // initialize queue with all nodes that dont have any inbounded edges
  const stack = [];
  for (let i = 0; i < inboundEdges.length; i++) {
    if (inboundEdges[i] === 0) stack.push(i);
  }
  // initialize counts 2D array where rows are n and columns are letters
  const counts = new Array(inboundEdges.length)
    .fill()
    .map(() => new Array(26).fill(0));
  let seen = 0;
  let max = 0;

  while (stack.length) {
    const current = stack.pop();
    seen++;
    const col = colors[current].charCodeAt() - 97;
    max = Math.max(max, ++counts[current][col]);
    // remove edge
    for (let nei of graph[current]) {
      // update counts
      for (let i = 0; i < 26; i++) {
        // update frequency of colors for neighbor to include paths that use node -> neighbor
        counts[nei][i] = Math.max(counts[nei][i], counts[current][i]);
      }
      inboundEdges[nei]--;
      if (inboundEdges[nei] === 0) stack.push(nei);
    }
  }

  return seen === colors.length ? max : -1;
};

const createGraph = (n, edges) => {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (let [from, to] of edges) {
    graph[from].push(to);
  }
  return graph;
};
