/**
 * You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting vertices ai and bi.

Return the number of complete connected components of the graph.

A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.

A connected component is said to be complete if there exists an edge between every pair of its vertices.

Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.

Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.
 */

// O(v + e) time | O(v + e) space
const countCompleteComponents = (n, edges) => {
  // create graph
  const graph = createGraph(n, edges);

  const visited = new Set();
  const leaders = [];
  // for each node in graph, perform DFS that will get you connected components and size
  for (let node in graph) {
    const result = dfs(graph, Number(node), visited);
    if (result[0]) {
      // push a representative for each connected component
      leaders.push([node, result[1]]);
    }
  }
  let completeComponents = 0;
  // for every leader, check if edges from each node === size - 1
  for (let leader of leaders) {
    const [node, size] = leader;
    let complete = graph[node].length === size - 1 ? true : false;
    for (let nei of graph[node]) {
      if (graph[nei].length !== size - 1) complete = false;
    }
    if (complete) completeComponents++;
  }
  return completeComponents;
};

// special dfs that return connected components and size
const dfs = (graph, node, visited) => {
  if (visited.has(node)) return [false, 0];
  visited.add(node);
  let size = 1;
  for (let nei of graph[node]) {
    const [bool, neiSize] = dfs(graph, nei, visited);
    if (bool) size += neiSize;
  }
  return [true, size];
};

const createGraph = (n, edges) => {
  const graph = {};

  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};
