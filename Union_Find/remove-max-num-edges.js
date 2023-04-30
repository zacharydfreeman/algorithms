/**
 * Alice and Bob have an undirected graph of n nodes and three types of edges:

Type 1: Can be traversed by Alice only.
Type 2: Can be traversed by Bob only.
Type 3: Can be traversed by both Alice and Bob.
Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge of type typei between nodes ui and vi, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return the maximum number of edges you can remove, or return -1 if Alice and Bob cannot fully traverse the graph.

Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.

Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.

Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.
 */

// Approach: Create to instances of disjoint set for bob and alice
// O(e) time | O(n) space where e is the number of edges and n is the number of nodes
const maxNumEdgesToRemove = (n, edges) => {
  const bobUF = new UnionFind(n);
  const aliceUF = new UnionFind(n);
  let edgesAdded = 0;
  // add type 3 edges first because they can be traversed by both
  for (let edge of edges) {
    if (edge[0] === 3) {
      // add to edges if both return true
      if (bobUF.union(edge[1], edge[2]) && aliceUF.union(edge[1], edge[2]))
        edgesAdded++;
    }
  }
  // add their individual edges
  for (let edge of edges) {
    if (edge[0] === 1) {
      if (aliceUF.union(edge[1], edge[2])) edgesAdded++;
    }
    if (edge[0] === 2) {
      if (bobUF.union(edge[1], edge[2])) edgesAdded++;
    }
  }

  // if both are connected return n - edgesAdded
  if (bobUF.isConnected() && aliceUF.isConnected()) {
    return edges.length - edgesAdded;
  }
  // return -1 if not connected
  return -1;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.ranks = new Array(n).fill(1);
    this.unconnectedComponents = n;
  }

  find(n) {
    let parent = n;
    while (parent !== this.parents[parent]) {
      // path compression
      this.parents[parent] = this.parents[this.parents[parent]];
      // update parent pointer
      parent = this.parents[parent];
    }
    return parent;
  }

  union(n1, n2) {
    const parent1 = this.find(n1);
    const parent2 = this.find(n2);

    // if the parents are the same, this is a redudant connection
    if (parent1 === parent2) return false;
    // union by rank
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

  isConnected() {
    return this.unconnectedComponents <= 1;
  }
}
