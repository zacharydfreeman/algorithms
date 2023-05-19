/*
There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2

Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.

*/

// O(v + e) time | O(v + e)
const validPath = (n, edges, source, destination) => {
  const graph = createGraph(n, edges);
  const visited = new Set();
  const stack = [source];
  while (stack.length) {
    const current = stack.pop();
    if (current === destination) return true;
    for (let nei of graph[current]) {
      if (visited.has(nei)) continue;
      visited.add(nei);
      stack.push(nei);
    }
  }
  return false;
};

// Approach: Recursive DFS
// O(v + e) time | O(v + e) space
const validPath2 = (n, edges, source, destination) => {
  const graph = createGraph(n, edges);
  const visited = new Set();
  return dfs(graph, source, destination, visited);
};

const dfs = (graph, source, destination, visited) => {
  if (source === destination) return true;
  if (visited.has(source)) return false;
  visited.add(source);
  for (let nei of graph[source]) {
    if (dfs(graph, nei, destination, visited)) return true;
  }
  return false;
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
