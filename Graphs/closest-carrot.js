/*
Write a function, closestCarrot, that takes in a grid, a starting row, and a starting column.
In the grid, 'X's are walls, 'O's are open spaces, and 'C's are carrots.
The function should return a number representing the length of the shortest path from the starting
position to a carrot. You may move up, down, left, or right, but cannot pass through walls (X).
If there is no possible path to a carrot, then return -1.

const grid = [
  ['O', 'O', 'O', 'O', 'O'],
  ['O', 'X', 'O', 'O', 'O'],
  ['O', 'X', 'X', 'O', 'O'],
  ['O', 'X', 'C', 'O', 'O'],
  ['O', 'X', 'X', 'O', 'O'],
  ['C', 'O', 'O', 'O', 'O'],
];

closestCarrot(grid, 1, 2); // -> 4
 */

// Approach: BFS
// O(n*m) time | O(n*m) space ignoring the extra time from the shift operation
const closestCarrot = (grid, row, col) => {
  // initialize our queue and visited set
  const visited = new Set();
  const queue = [[row, col, 0]];
  // while queue is not empty
  while (queue.length !== 0) {
    // grab current node (position)
    const [currentRow, currentCol, currentDistance] = queue.shift();
    // [row, col, 0]
    if (grid[currentRow][currentCol] === "C") return currentDistance;
    // check if pos is legal, if pos is X
    const positions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    for (let position of positions) {
      const [rowDelta, colDelta] = position;
      const newRow = currentRow + rowDelta;
      const newCol = currentCol + colDelta;
      // add to this queue
      const rowIsValid = 0 <= newRow && newRow < grid.length;
      const colIsValid = 0 <= newCol && newCol < grid[0].length;
      const pos = newRow + "," + newCol;
      if (
        rowIsValid &&
        colIsValid &&
        grid[newRow][newCol] !== "X" &&
        !visited.has(pos)
      ) {
        queue.push([newRow, newCol, currentDistance + 1]);
        visited.add(pos);
      }
    }
  }

  return -1;
};

const grid = [
  ["O", "O", "O", "O", "O"],
  ["O", "X", "O", "O", "O"],
  ["O", "X", "X", "O", "O"],
  ["O", "X", "C", "O", "O"],
  ["O", "X", "X", "O", "O"],
  ["C", "O", "O", "O", "O"],
];

console.log(closestCarrot(grid, 1, 2));
