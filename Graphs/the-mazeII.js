/* 
There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return the shortest distance for the ball to stop at the destination. If the ball cannot stop at destination, return -1.

The distance is the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included).

You may assume that the borders of the maze are all walls (see examples).

Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: 12
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.
The length of the path is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.


Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
Output: -1
Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.

Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
Output: -1

*/

// O(m * n * max(m, n)) time | O(m * n) space
const shortestDistance = (maze, start, destination) => {
  const distances = new Array(maze.length)
    .fill()
    .map(() => new Array(maze[0].length).fill(Infinity));
  distances[start[0]][start[1]] = 0;
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let queue = [start];
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [row, col] = queue[i];

      for (let [rowDelta, colDelta] of deltas) {
        let newRow = row + rowDelta;
        let newCol = col + colDelta;
        let count = 0;
        // find the next valid position
        while (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < maze.length &&
          newCol < maze[0].length &&
          maze[newRow][newCol] === 0
        ) {
          newRow += rowDelta;
          newCol += colDelta;
          count++;
        }

        if (
          distances[row][col] + count <
          distances[newRow - rowDelta][newCol - colDelta]
        ) {
          distances[newRow - rowDelta][newCol - colDelta] =
            distances[row][col] + count;
          nextLevel.push([newRow - rowDelta, newCol - colDelta]);
        }
      }
    }
    queue = nextLevel;
  }
  return distances[destination[0]][destination[1]] === Infinity
    ? -1
    : distances[destination[0]][destination[1]];
};
