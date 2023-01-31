/*

A supply chain manager at Amazon Logisitcs wants to determine the number of connections between warehouses,
represented as nodes on a grid. A grid with m rows and n columns is used to form a cluster of nodes.
If a point in the grid has a value of 1, then it represents a node.

Each node in the cluster has a level associated with it. A node located in the ith row of the grid is a
level inode.

Here are the rules for creating a cluster:

Every node at a level connects to the next level that contains at least 1 node
(i.e., every node at level i connects to all the nodes at level k where k > i and k is the first level
    after level i than contains at least one node).
When i reaches the last level in the grid, no more connections are possible.
Given such a grid, please help the supply chain manager by finding the number of connections
present in the cluster.

Input
grid: the nodes grid
Output
the total number of connections

Examples
Example 1:
Input:

grid = [[1, 1, 1], [0, 1, 0], [0, 0, 0], [1, 1, 0]]
Output: 5

*/

// O(n*m) time | O(1) space
const gridConnections = (grid) => {
  // declare connections variable
  let connections = 0;
  let priorNodeCount = 0;
  for (let row = 0; row < grid.length; row++) {
    let currentNodeCount = 0;
    // loop through columns and add to rowCount
    for (let col = 0; col < grid[0].length; col++) {
      currentNodeCount += grid[row][col];
    }
    connections += priorNodeCount * currentNodeCount;
    //update prior
    if (currentNodeCount > 0) {
      priorNodeCount = currentNodeCount;
    }
  }
  return connections;
};
