/**
 *You are given an empty 2D binary grid grid of size m x n. The grid represents a map where 0's represent water and 1's represent land. Initially, all the cells of grid are water cells (i.e., all the cells are 0's).

We may perform an add land operation which turns the water at position into a land. You are given an array positions where positions[i] = [ri, ci] is the position (ri, ci) at which we should operate the ith operation.

Return an array of integers answer where answer[i] is the number of islands after turning the cell (ri, ci) into a land.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
Output: [1,1,2,3]
Explanation:
Initially, the 2d grid is filled with water.
- Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land. We have 1 island.
- Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land. We still have 1 island.
- Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land. We have 2 islands.
- Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land. We have 3 islands.

Input: m = 1, n = 1, positions = [[0,0]]
Output: [1]
 */

// Approach: Union Find
// O(m * n + p) time | O(m * n) space where m is the number of rows, n is the number of columns and p is the length of the positions array
const numIslands2 = (m, n, positions) => {
  // create an instance of a disjoint set and output array
  const uf = new UnionFind(m, n);
  const output = [];
  for (let [row, col] of positions) {
    // increase unconnectedComponents count and rank. Only increase count if you havent seen the position before
    if (!uf.ranks[row * n + col]) uf.unconnectedComponents++;
    uf.ranks[row * n + col] = 1;
    // 4 way union
    if (row + 1 < m && uf.ranks[(row + 1) * n + col] > 0)
      uf.union(row * n + col, (row + 1) * n + col);
    if (row - 1 >= 0 && uf.ranks[(row - 1) * n + col] > 0)
      uf.union(row * n + col, (row - 1) * n + col);
    if (col + 1 < n && uf.ranks[row * n + col + 1] > 0)
      uf.union(row * n + col, row * n + col + 1);
    if (col - 1 >= 0 && uf.ranks[row * n + col - 1] > 0)
      uf.union(row * n + col, row * n + col - 1);
    // push unconnectedComponents into output
    output.push(uf.unconnectedComponents);
  }
  return output;
};

class UnionFind {
  constructor(m, n) {
    this.parents = new Array(m * n).fill().map((_, idx) => idx);
    this.ranks = new Array(m * n).fill(0);
    this.unconnectedComponents = 0;
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

    this.unconnectedComponents--;
    return true;
  }
}
