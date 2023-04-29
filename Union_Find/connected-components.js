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
  const unionFind = new UnionFind(n);
  for (let [n1, n2] of edges) {
    unionFind.union(n1, n2);
  }
  return unionFind.unconnectedComponents;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.unconnectedComponents = n;
  }

  find(n) {
    let parent = n;
    while (parent !== this.parents[parent]) {
      // path compression
      this.parents[parent] = this.parents[this.parents[parent]];
      parent = this.parents[parent];
    }
    return parent;
  }

  union(n1, n2) {
    const parent1 = this.find(n1);
    const parent2 = this.find(n2);
    // parents are equal, return
    if (parent1 === parent2) return;

    if (parent1 !== parent2) {
      // decrement unconnectedComponents
      this.unconnectedComponents--;
      this.parents[parent1] = parent2;
    }
    return;
  }
}
