/**
 * In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

The given input is a directed graph that started as a rooted tree with n nodes (with distinct values from 1 to n), with one additional directed edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [ui, vi] that represents a directed edge connecting nodes ui and vi, where ui is a parent of child vi.

Return an edge that can be removed so that the resulting graph is a rooted tree of n nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array.

Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]
 */

// O(e) time | O(e) space
const findRedundantDirectedConnection = (edges) => {
  // find inbound node to determine if there is a node with multiple parents
  const inbound = {};
  for (let [n1, n2] of edges) {
    if (!(n2 in inbound)) inbound[n2] = [];
    inbound[n2].push(n1);
  }
  // check to see if there is a node with multiple inbounds
  for (let node in inbound) {
    if (inbound[node].length > 1) {
      // if so, reconstruct edges
      const edge1 = [inbound[node][0], Number(node)];
      const edge2 = [inbound[node][1], Number(node)];
      // creatre new edges array to pass into unionFind method
      const newEdges = [];
      for (let edge of edges) {
        // you want to return the last edge in the array so check against edge2
        if (edge[0] === edge2[0] && edge[1] === edge2[1]) continue;
        newEdges.push(edge);
      }
      // if union find return -1, that means there are no cycles after removing edge2, so return edge 2
      if (unionFind(newEdges) === -1) return edge2;
      // otherwise return edge1
      return edge1;
    }
  }
  // return redudant connection after checking if there are any node with multiple parents
  return unionFind(edges);
};

const unionFind = (edges) => {
  const uf = new UnionFind(edges.length + 1);
  for (let [n1, n2] of edges) {
    if (!uf.union(n1, n2)) return [n1, n2];
  }
  return -1;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
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

    this.parents[parent2] = parent1;

    return true;
  }
}

const edges = [
  [1, 2],
  [1, 3],
  [2, 3],
];

console.log(findRedundantDirectedConnection(edges));
