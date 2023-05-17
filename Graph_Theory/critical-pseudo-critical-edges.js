/* 
Given a weighted undirected connected graph with n vertices numbered from 0 to n - 1, and an array edges where edges[i] = [ai, bi, weighti] represents a bidirectional and weighted edge between nodes ai and bi. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.

Note that you can return the indices of the edges in any order.

Input: n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
Output: [[0,1],[2,3,4,5]]

Input: n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
Output: [[],[0,1,2,3]]

*/

// Approach: Modified Kruskal's Algorithm
// O(elog(e)) time | O(n) space where e is number of edges and n is number of vertices
const findCriticalAndPseudoCriticalEdges = (n, edges) => {
  // create disjoint set
  const uf = new UnionFind(n);
  // before the edges are sorted, add the index to each tuple so we dont lose the original order
  for (let i = 0; i < edges.length; i++) {
    edges[i].push(i);
  }
  // sort edges
  edges.sort((a, b) => a[2] - b[2]);
  // we need to find MST weight that we will compare other MSTs too
  const weight = findMSTWeight(n, edges);
  // declare critical and psuedo-critical arrays
  const critical = [];
  const pseudoCritical = [];
  // loop through edges and check if critical or not
  for (let i = 0; i < edges.length; i++) {
    // check if exlcuded, does weight go up? If so, add to critical
    if (weight < findMSTWeight(n, edges, i)) {
      critical.push(edges[i][3]);
    } else if (weight === findMSTWeight(n, edges, -1, i)) {
      pseudoCritical.push(edges[i][3]);
    }
  }
  return [critical, pseudoCritical];
};

const findMSTWeight = (n, edges, exclude = -1, include = -1) => {
  const uf = new UnionFind(n);
  let mst_weight = 0;
  // make sure to include edge if not -1
  if (include !== -1) {
    const [n1, n2, weight, idx] = edges[include];
    if (uf.union(n1, n2)) mst_weight += weight;
  }

  for (let i = 0; i < edges.length; i++) {
    if (i === exclude) continue;
    const [n1, n2, weight, idx] = edges[i];
    if (uf.union(n1, n2)) mst_weight += weight;
  }
  // check if connected
  if (!uf.connected()) return Infinity;
  return mst_weight;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.ranks = new Array(n).fill(1);
    this.unconnectedComponents = n;
  }

  find(n) {
    let parent = this.parents[n];
    while (parent !== this.parents[parent]) {
      this.parents[parent] = this.parents[this.parents[parent]];
      parent = this.parents[parent];
    }
    return parent;
  }

  union(n1, n2) {
    let parent1 = this.find(n1);
    let parent2 = this.find(n2);

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
    this.unconnectedComponents--;
    return true;
  }

  connected() {
    return this.unconnectedComponents === 1;
  }
}
