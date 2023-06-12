/* 
You are given an m x n grid grid of values 0, 1, or 2, where:

each 0 marks an empty land that you can pass by freely,
each 1 marks a building that you cannot pass through, and
each 2 marks an obstacle that you cannot pass through.
You want to build a house on an empty land that reaches all buildings in the shortest total travel distance. You can only move up, down, left, and right.

Return the shortest travel distance for such a house. If it is not possible to build such a house according to the above rules, return -1.

The total travel distance is the sum of the distances between the houses of the friends and the meeting point.

The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

Input: grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 7
Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2).
The point (1,2) is an ideal empty land to build a house, as the total travel distance of 3+3+1=7 is minimal.
So return 7.

Input: grid = [[1,0]]
Output: 1

Input: grid = [[1]]
Output: -1

*/

// O(m^2 * n^2) time | O(m * n) space
const shortestDistance = (grid) => {
  let distance = Infinity;
  let houses = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) houses++;
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 0)
        distance = Math.min(distance, bfs(grid, row, col, houses));
    }
  }
  return distance === Infinity ? -1 : distance;
};

const bfs = (grid, row, col, houses) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Set([row + ',' + col]);
  let queue = [[row, col, 0]];
  let totalDistance = 0;
  let numHouses = 0;
  while (queue.length) {
    const nextLevel = [];
    for (let [row, col, distance] of queue) {
      if (grid[row][col] === 1) {
        totalDistance += distance;
        numHouses++;
        continue;
      }
      for (let [rD, cD] of deltas) {
        const newRow = row + rD;
        const newCol = col + cD;
        const rowInBounds = 0 <= newRow && newRow < grid.length;
        const colInBounds = 0 <= newCol && newCol < grid[0].length;
        const pos = newRow + ',' + newCol;
        if (
          rowInBounds &&
          colInBounds &&
          !visited.has(pos) &&
          grid[newRow][newCol] !== 2
        ) {
          visited.add(pos);
          nextLevel.push([newRow, newCol, distance + 1]);
        }
      }
    }
    queue = nextLevel;
  }
  // if you cant reach all houses, mark all empty places that were visited with 2 to save time for the future iterations
  if (numHouses !== houses) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const pos = row + ',' + col;
        if (grid[row][col] === 0 && visited.has(pos)) {
          grid[row][col] = 2;
        }
      }
    }
    return Infinity;
  }
  return totalDistance === 0 ? Infinity : totalDistance;
};
