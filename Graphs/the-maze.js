/* 
There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination, otherwise return false.

You may assume that the borders of the maze are all walls (see examples).

Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: true
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
Output: false
Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.

Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
Output: false

*/

// O(m * n) time | O(m * n) space
const hasPath = (maze, start, destination) => {
  const visited = new Set([start[0] + ',' + start[1]]);
  let queue = [start];
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [row, col] = queue[i];
      if (row === destination[0] && col === destination[1]) return true;
      // get neighbors
      const neighbors = getNeighbors(maze, row, col);
      for (let [neiRow, neiCol] of neighbors) {
        const pos = neiRow + ',' + neiCol;
        if (visited.has(pos)) continue;
        // add to next level
        visited.add(pos);
        nextLevel.push([neiRow, neiCol]);
      }
    }
    queue = nextLevel;
  }
  return false;
};

const getNeighbors = (maze, row, col) => {
  const validPos = [];
  // go left
  let left = col;
  while (left >= 0 && maze[row][left] !== 1) {
    left--;
  }
  validPos.push([row, left + 1]);
  // go right
  let right = col;
  while (right < maze[0].length && maze[row][right] !== 1) {
    right++;
  }
  validPos.push([row, right - 1]);
  // go up
  let up = row;
  while (up >= 0 && maze[up][col] !== 1) {
    up--;
  }
  validPos.push([up + 1, col]);
  // go down
  let down = row;
  while (down < maze.length && maze[down][col] !== 1) {
    down++;
  }
  validPos.push([down - 1, col]);

  return validPos;
};
