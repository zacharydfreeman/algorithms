/* 
You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.

Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
*/

// Approach: Union find
// O(e) time | O(n) space where e is the number of edges and n is the number of nodes
const validTree = (n, edges) => {
  const unionFind = new UnionFind(n);
  for (let [a, b] of edges) {
    if (!unionFind.union(a, b)) return false;
  }
  // return if connected graph
  return unionFind.unconnetedComponents === 1;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.ranks = new Array(n).fill(1);
    this.unconnetedComponents = n;
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

    if (parent1 === parent2) return false;

    const rank1 = this.ranks[parent1];
    const rank2 = this.ranks[parent2];

    if (rank1 > rank2) {
      this.parents[parent2] = parent1;
      this.ranks[parent1] += this.ranks[parent2];
    } else {
      this.parents[parent1] = parent2;
      this.ranks[parent2] += this.ranks[parent1];
    }
    this.unconnetedComponents--;
    return true;
  }
}
