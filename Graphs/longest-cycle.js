/*
You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.

The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge from node i to node edges[i]. If there is no outgoing edge from node i, then edges[i] == -1.

Return the length of the longest cycle in the graph. If no cycle exists, return -1.

A cycle is a path that starts and ends at the same node.

Input: edges = [3,3,4,2,3]
Output: 3
Explanation: The longest cycle in the graph is the cycle: 2 -> 4 -> 3 -> 2.
The length of this cycle is 3, so 3 is returned.

Input: edges = [2,-1,3,1]
Output: -1
Explanation: There are no cycles in this graph.

*/

// O(n) time | O(n) space
const longestCycle = (edges) => {
  // declare visited array and longest variable
  const visited = new Array(edges.length).fill(false);
  let longest = -1;

  const visit = (current) => {
    // declare distances object and distance variable to keep track of distances
    const distances = {};
    let distance = 0;
    // iterate while you dont have a cycle
    while (!visited[current]) {
      // mark as visited and set distance to current distance
      visited[current] = true;
      distances[current] = distance;
      distance++;
      // move on to next node if not -1
      if (edges[current] !== -1) {
        current = edges[current];
        if (current in distances) {
          // we have found a cycle
          longest = Math.max(longest, distance - distances[current]);
        }
      }
    }
  };
  // visit each node that hasnt been visited and has outbound edges
  for (let i = 0; i < edges.length; i++) {
    if (!visited[i] && edges[i] !== -1) visit(i);
  }
  // return longest
  return longest;
};
