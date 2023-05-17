/* 
There are n houses in a village. We want to supply water for all the houses by building wells and laying pipes.

For each house i, we can either build a well inside it directly with cost wells[i - 1] (note the -1 due to 0-indexing), or pipe in water from another well to it. The costs to lay pipes between houses are given by the array pipes where each pipes[j] = [house1j, house2j, costj] represents the cost to connect house1j and house2j together using a pipe. Connections are bidirectional, and there could be multiple valid connections between the same two houses with different costs.

Return the minimum total cost to supply water to all houses.

Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
Output: 3
Explanation: The image shows the costs of connecting houses using pipes.
The best strategy is to build a well in the first house with cost 1 and connect the other houses to it with cost 2 so the total cost is 3.

Input: n = 2, wells = [1,1], pipes = [[1,2,1],[1,2,2]]
Output: 2
Explanation: We can supply water with cost two using one of the three options:
Option 1:
  - Build a well inside house 1 with cost 1.
  - Build a well inside house 2 with cost 1.
The total cost will be 2.
Option 2:
  - Build a well inside house 1 with cost 1.
  - Connect house 2 with house 1 with cost 1.
The total cost will be 2.
Option 3:
  - Build a well inside house 2 with cost 1.
  - Connect house 1 with house 2 with cost 1.
The total cost will be 2.
Note that we can connect houses 1 and 2 with cost 1 or with cost 2 but we will always choose the cheapest option. 


*/

// Approach: Modified MST with Kruskal's
// O((n + m)log(n + m)) time | O(n + m) space where n is number of wells and m is number of pipes
const minCostToSupplyWater = (n, wells, pipes) => {
  const edges = [];
  // add virtual edges from wells (0 pointing to the index)
  for (let i = 0; i < wells.length; i++) {
    edges.push([0, i + 1, wells[i]]);
  }
  // add the pipes to the edges
  for (let i = 0; i < pipes.length; i++) {
    edges.push(pipes[i]);
  }

  // sort pipes and wells
  edges.sort((a, b) => a[2] - b[2]);
  const mstCost = findMST(n, edges);
  return mstCost;
};

const findMST = (n, edges) => {
  const uf = new UnionFind(n);
  let minCost = 0;
  for (let i = 0; i < edges.length; i++) {
    const [n1, n2, cost] = edges[i];
    if (uf.union(n1, n2)) minCost += cost;
  }
  return minCost;
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
