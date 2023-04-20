/* Implement a bidirectional BFS */

const bidirectionalBFS = (startNode, endNode) => {
  // Initialize the start and end nodes and their queues
  let queueStart = [startNode];
  let queueEnd = [endNode];
  let visitedStart = new Set();
  let visitedEnd = new Set();
  visitedStart.add(startNode);
  visitedEnd.add(endNode);

  // Loop until both queues are empty
  while (queueStart.length > 0 && queueEnd.length > 0) {
    // BFS search from start node
    let currentStart = queueStart.shift();
    for (let neighbor of currentStart.neighbors) {
      if (!visitedStart.has(neighbor)) {
        queueStart.push(neighbor);
        visitedStart.add(neighbor);
      }
      // If the neighbor has been visited by the end BFS, return the path
      if (visitedEnd.has(neighbor)) {
        return 'Path found!';
      }
    }
    // BFS search from end node
    let currentEnd = queueEnd.shift();
    for (let neighbor of currentEnd.neighbors) {
      if (!visitedEnd.has(neighbor)) {
        queueEnd.push(neighbor);
        visitedEnd.add(neighbor);
      }
      // If the neighbor has been visited by the start BFS, return the path
      if (visitedStart.has(neighbor)) {
        return 'Path found!';
      }
    }
  }
  // If no path is found, return no path found
  return 'No path found';
};
