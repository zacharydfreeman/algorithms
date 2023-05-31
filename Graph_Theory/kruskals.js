/* 
Implement Kruskal's algorithm
*/

const findMST = (n, edges) => {
  // sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  // declare an instance of our Union Find class
  const uf = new UnionFind(n);
  // declare an empty array that will contain the edges of our MST
  const MST = [];
  let MSTWeight = 0;
  for (let [n1, n2, weight] of edges) {
    // if we can successfully union, add edge to our MST
    if (uf.union(n1, n2)) {
      MST.push([n1, n2]);
      MSTWeight += weight;
    }
  }
  // return MST
  return MST;
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

const n = 6;
const edges = [
  [2, 5, 5],
  [1, 2, 2],
  [4, 3, 5],
  [3, 2, 3],
  [0, 4, 1],
  [0, 1, 2],
  [1, 3, 6],
];

console.log(findMST(n, edges));
