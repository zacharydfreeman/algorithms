/* 
There are n cities labeled from 1 to n. You are given the integer n and an array connections where connections[i] = [xi, yi, costi] indicates that the cost of connecting city xi and city yi (bidirectional connection) is costi.

Return the minimum cost to connect all the n cities such that there is at least one path between each pair of cities. If it is impossible to connect all the n cities, return -1,

The cost is the sum of the connections' costs used.

Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
Output: 6
Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.

*/

// O(mlog(m)) time | O(n) space where m is number of connection and n is number of cities
const minimumCost = (n, connections) => {
  // sort connections
  connections.sort((a, b) => a[2] - b[2]);
  const uf = new UnionFind(n);
  let minCost = 0;
  for (let i = 0; i < connections.length; i++) {
    const [n1, n2, cost] = connections[i];
    if (uf.union(n1, n2)) minCost += cost;
  }
  return uf.unconnectedComponents === 1 ? minCost : -1;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n + 1).fill().map((_, idx) => idx);
    this.ranks = new Array(n + 1).fill(1);
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
    const p1 = this.find(n1);
    const p2 = this.find(n2);

    if (p1 === p2) return false;

    const r1 = this.ranks[p1];
    const r2 = this.ranks[p2];

    if (r1 > r2) {
      this.parents[p2] = p1;
      this.ranks[p1] += this.ranks[p2];
    } else {
      this.parents[p1] = p2;
      this.ranks[p2] += this.ranks[p1];
    }

    this.unconnectedComponents--;
    return true;
  }
}
