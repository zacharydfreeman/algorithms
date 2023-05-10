/**
 * You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1
 */

// O(e) time | O(v) space where e is the number of edges and v is the number of vertices
const countComponents = (n, edges) => {
  const disjointSet = new DisjointSet(n);
  for (let [n1, n2] of edges) {
    disjointSet.union(n1, n2);
  }
  return disjointSet.unconnectedComponents;
};

class DisjointSet {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.ranks = new Array(n).fill(1);
    this.unconnectedComponents = n;
  }

  find(n) {
    let parent = n;
    while (parent !== this.parents[parent]) {
      this.parents[parent] = this.parents[this.parents[parent]];
      parent = this.parents[parent];
    }
    return parent;
  }

  union(n1, n2) {
    const parent1 = this.find(n1);
    const parent2 = this.find(n2);

    if (parent1 === parent2) return;

    const rank1 = this.ranks[parent1];
    const rank2 = this.ranks[parent2];

    if (rank1 > rank2) {
      this.parents[parent2] = parent1;
      this.ranks[parent1] += this.ranks[parent2];
    } else {
      this.parents[parent1] = parent2;
      this.ranks[parent2] = +this.ranks[parent1];
    }
    this.unconnectedComponents--;
    return;
  }
}

// O(v + e) time | O(v + e) space
const countComponents2 = (n, edges) => {
  const graph = createGraph(n, edges);
  let connectedComponents = 0;
  const visited = new Set();
  for (let node in graph) {
    if (dfs(graph, Number(node), visited)) connectedComponents++;
  }
  return connectedComponents;
};

const dfs = (graph, node, visited) => {
  if (visited.has(node)) return false;
  visited.add(node);
  for (let neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
  return true;
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
