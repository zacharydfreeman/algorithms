/* 
You are starving and you want to eat food as quickly as possible. You want to find the shortest path to arrive at any food cell.

You are given an m x n character matrix, grid, of these different types of cells:

'*' is your location. There is exactly one '*' cell.
'#' is a food cell. There may be multiple food cells.
'O' is free space, and you can travel through these cells.
'X' is an obstacle, and you cannot travel through these cells.
You can travel to any adjacent cell north, east, south, or west of your current location if there is not an obstacle.

Return the length of the shortest path for you to reach any food cell. If there is no path for you to reach food, return -1.

Input: grid = [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]
Output: 3
Explanation: It takes 3 steps to reach the food.

Input: grid = [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]]
Output: -1
Explanation: It is not possible to reach the food.

Input: grid = [["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["X","X","X","X","X","X","X","X"]]
Output: 6
Explanation: There can be multiple food cells. It only takes 6 steps to reach the bottom food.

*/

// Approach: BFS
// O(m * n) time | O(m * n) space
const getFood = (grid) => {
  const visited = new Set();
  let queue = [];
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '*') {
        queue.push([r, c, 0]);
        visited.add(r + ',' + c);
      }
    }
  }
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [r, c, distance] = queue[i];
      if (grid[r][c] === '#') return distance;
      for (let [rD, cD] of deltas) {
        const nR = r + rD;
        const nC = c + cD;
        const rowInBounds = 0 <= nR && nR < grid.length;
        const colInBounds = 0 <= nC && nC < grid[0].length;
        const pos = nR + ',' + nC;
        if (
          rowInBounds &&
          colInBounds &&
          !visited.has(pos) &&
          grid[nR][nC] !== 'X'
        ) {
          visited.add(pos);
          nextLevel.push([nR, nC, distance + 1]);
        }
      }
    }
    queue = nextLevel;
  }
  return -1;
};
