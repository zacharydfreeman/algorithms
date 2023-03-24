/* 
There are n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] represents a connection between computers ai and bi. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.

Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.
*/

// Approach: Union Find
// O(n) time | O(n) space
const makeConnected = (n, connections) => {
  const unionFind = new UnionFind(n);
  for (let [x, y] of connections) {
    unionFind.union(x, y);
  }
  const unconnectedComponents = unionFind.disconnectedComponents - 1;

  return unionFind.redundantConnections >= unconnectedComponents
    ? unconnectedComponents
    : -1;
};

class UnionFind {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, idx) => idx);
    this.redundantConnections = 0;
    this.disconnectedComponents = n;
  }

  find(id) {
    if (this.parents[id] === id) return id;
    this.parents[id] = this.find(this.parents[id]);
    return this.parents[id];
  }

  union(x, y) {
    const parentX = this.find(x);
    const parentY = this.find(y);
    if (parentX !== parentY) {
      this.parents[parentY] = parentX;
      this.disconnectedComponents--;
    } else {
      this.redundantConnections++;
    }
  }
}
