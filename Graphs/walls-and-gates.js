/* 
You are given an m x n grid rooms initialized with these three possible values.

-1 A wall or an obstacle.
0 A gate.
INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

*/

// Approach: Multi-directional BFS
// O(r * c) time | O(r * c) space where r is the number of rows and c is the number of columns
const wallsAndGates = (rooms) => {
  // initialize queue with all gate poisition
  let queue = [];
  const visited = new Set();
  for (let row = 0; row < rooms.length; row++) {
    for (let col = 0; col < rooms[0].length; col++) {
      if (rooms[row][col] === 0) {
        const pos = row + ',' + col;
        visited.add(pos);
        queue.push([row, col, 0]);
      }
    }
  }

  while (queue.length) {
    const [row, col, dist] = queue.shift();
    // if position is Inf, change to distance
    if (rooms[row][col] > 0) rooms[row][col] = dist;
    // get neighbors
    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let [rowDelta, colDelta] of deltas) {
      const newRow = row + rowDelta;
      const newCol = col + colDelta;
      const rowInBounds = 0 <= newRow && newRow < rooms.length;
      const colInBounds = 0 <= newCol && newCol < rooms[0].length;
      const pos = newRow + ',' + newCol;
      if (
        rowInBounds &&
        colInBounds &&
        !visited.has(pos) &&
        rooms[newRow][newCol] !== -1
      ) {
        visited.add(pos);
        queue.push([newRow, newCol, dist + 1]);
      }
    }
  }
  return rooms;
};
