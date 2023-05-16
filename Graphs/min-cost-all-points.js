/*
You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20

Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18
*/

// Approach: Kruskal's Algorithm
// O(n^2 * log(n)) time | O(n^2) space where n is the number of points array
const minCostConnectPoints = (points) => {
  // create edges
  const edges = [];
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      edges.push([i, j, distance]);
    }
  }
  edges.sort((a, b) => a[2] - b[2]);
  console.log(edges);
  const uf = new UnionFind(points.length);

  let minCost = 0;
  for (let i = 0; i < edges.length; i++) {
    const [n1, n2, cost] = edges[i];
    console.log(uf.parents);
    if (uf.union(n1, n2)) {
      console.log(n1, n2);
      minCost += cost;
    }
  }
  return minCost;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.ranks = new Array(n).fill(1);
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

    return true;
  }
}

const points = [
  [2, -3],
  [-17, -8],
  [13, 8],
  [-17, -15],
];
console.log(minCostConnectPoints(points));
