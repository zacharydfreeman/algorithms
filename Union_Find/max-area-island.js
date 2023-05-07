/**
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
 */

// Approach: Union Find.
// O(m * n) time | O(m * n) space where m is the number of rows and n is the number of columns
const maxAreaOfIsland = (grid) => {
  const uf = new UnionFind(grid);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) {
        // union
        if (row + 1 < grid.length && grid[row + 1][col])
          uf.union(
            row * grid[0].length + col,
            (row + 1) * grid[0].length + col
          );
        if (row - 1 >= 0 && grid[row - 1][col])
          uf.union(
            row * grid[0].length + col,
            (row - 1) * grid[0].length + col
          );
        if (col + 1 <= grid[0].length && grid[row][col + 1])
          uf.union(row * grid[0].length + col, row * grid[0].length + col + 1);
        if (col - 1 >= 0 && grid[row][col - 1])
          uf.union(row * grid[0].length + col, row * grid[0].length + col - 1);
      }
    }
  }
  // return the max of the ranks
  return Math.max(...uf.ranks);
};

class UnionFind {
  constructor(grid) {
    this.parents = new Array(grid.length * grid[0].length)
      .fill()
      .map((_, idx) => idx);
    this.ranks = new Array(grid.length * grid[0].length).fill(0);
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col]) this.ranks[row * grid[0].length + col] = 1;
      }
    }
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

    if (parent1 === parent2) return;

    const rank1 = this.ranks[parent1];
    const rank2 = this.ranks[parent2];

    if (rank1 > rank2) {
      this.parents[parent2] = parent1;
      this.ranks[parent1] += this.ranks[parent2];
    } else {
      this.parents[parent1] = parent2;
      this.ranks[parent2] += this.ranks[parent1];
    }
  }
}
