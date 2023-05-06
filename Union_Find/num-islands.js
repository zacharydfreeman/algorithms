/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 */

// O(n * m) time | O(n * m) space where n is the number of rows and m is the number of columns
const numIslands = (grid) => {
  const uf = new UnionFind(grid);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === '1') {
        uf.unconnectedComponents++;
        // union
        if (row + 1 < grid.length && grid[row + 1][col] === '1')
          uf.union(
            row * grid[0].length + col,
            (row + 1) * grid[0].length + col
          );
        if (row - 1 >= 0 && grid[row - 1][col] === '1')
          uf.union(
            row * grid[0].length + col,
            (row - 1) * grid[0].length + col
          );
        if (col + 1 < grid[0].length && grid[row][col + 1] === '1')
          uf.union(row * grid[0].length + col, row * grid[0].length + col + 1);
        if (col - 1 >= 0 && grid[row][col - 1] === '1')
          uf.union(row * grid[0].length + col, row * grid[0].length + col - 1);
      }
    }
  }
  return uf.unconnectedComponents;
};

class UnionFind {
  constructor(grid) {
    this.parents = new Array(grid.length * grid[0].length)
      .fill()
      .map((_, idx) => idx);
    this.ranks = new Array(grid.length * grid[0].length).fill(1);
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
}
