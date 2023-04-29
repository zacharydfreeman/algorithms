/**
 * Implement an Union Find (disjoint set) class
 */

class UnionFind {
  constructor(n) {
    // parents array that will keep track of parents
    const parents = new Array(n).fill().map((_, idx) => idx);
    // ranks array that will keep traack of ranks (i.e height of tree)
    const ranks = new Array(n).fill(1);
  }

  // the find method finds the parent of node being passed in
  find(n) {
    let parent = n;
    while (parent !== this.parents[n]) {
      // path compression
      this.parents[n] = this.parents[this.parents[n]];
      // update parent
      parent = this.parents[n];
    }
    return parent;
  }

  union(n1, n2) {
    // find both parents
    const parent1 = this.find(n1);
    const parent2 = this.find(n2);
    // if parents are equal return false, because a union cant happen. They are already unioned
    if (parent1 === parent2) return false;
    // union by rank
    const rank1 = this.ranks[parent1];
    const rank2 = this.ranks[parent2];

    if (rank1 > rank2) {
      // update parent of n2
      this.parents[parent2] = parent1;
    } else if (rank1 < rank2) {
      // update parent of n1
      this.parents[parent1] = parent2;
    } else {
      // they are equal, so arbitrarily set one parent to the other
      this.parents[parent2] = parent1;
    }
    // return true to denote a successful union
    return true;
  }
}
