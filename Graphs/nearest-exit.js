/* 
You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.

In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.

Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.

Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
Output: 1
Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
Initially, you are at the entrance cell [1,2].
- You can reach [1,0] by moving 2 steps left.
- You can reach [0,2] by moving 1 step up.
It is impossible to reach [2,3] from the entrance.
Thus, the nearest exit is [0,2], which is 1 step away.

Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
Output: 2
Explanation: There is 1 exit in this maze at [1,2].
[1,0] does not count as an exit since it is the entrance cell.
Initially, you are at the entrance cell [1,0].
- You can reach [1,2] by moving 2 steps right.
Thus, the nearest exit is [1,2], which is 2 steps away.

*/

// Approach: BFS
// O(m * n) time | O(m * n) space
const nearestExit = (maze, entrance) => {
  let queue = [[entrance[0], entrance[1], 0]];
  // mark entrance as visited
  maze[entrance[0]][entrance[1]] = '+';
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let firstPass = true;
  while (queue.length) {
    const nextLevel = [];
    for (let [row, col, distance] of queue) {
      for (let [rD, cD] of deltas) {
        const nR = row + rD;
        const nC = col + cD;
        const rowInBounds = 0 <= nR && nR < maze.length;
        const colInBounds = 0 <= nC && nC < maze[0].length;
        if (!rowInBounds || !colInBounds) {
          if (!firstPass) return distance;
          continue;
        }
        if (maze[nR][nC] === '+') continue;
        maze[nR][nC] = '+';
        nextLevel.push([nR, nC, distance + 1]);
      }
    }
    queue = nextLevel;
    firstPass = false;
  }
  return -1;
};
