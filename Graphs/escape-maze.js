/*
There is a 1 million by 1 million grid on an XY-plane, and the coordinates of each grid square are (x, y).

We start at the source = [sx, sy] square and want to reach the target = [tx, ty] square. There is also an array of blocked squares, where each blocked[i] = [xi, yi] represents a blocked square with coordinates (xi, yi).

Each move, we can walk one square north, east, south, or west if the square is not in the array of blocked squares. We are also not allowed to walk outside of the grid.

Return true if and only if it is possible to reach the target square from the source square through a sequence of valid moves.

Input: blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
Output: false
Explanation: The target square is inaccessible starting from the source square because we cannot move.
We cannot move north or east because those squares are blocked.
We cannot move south or west because we cannot go outside of the grid.

Input: blocked = [], source = [0,0], target = [999999,999999]
Output: true
Explanation: Because there are no blocked cells, it is possible to reach the target square.

*/

// O(r * c) time | O(r * c) space
const isEscapePossible = (blocked, source, target) => {
  return (
    _isEscapePossible(blocked, source, target) &&
    _isEscapePossible(blocked, target, source)
  );
};

const _isEscapePossible = (blocked, source, target) => {
  if (!blocked || blocked.length === 0) return true;
  // convert blocked positions into a set
  const blockedSet = new Set();
  for (let [row, col] of blocked) {
    const pos = row + ',' + col;
    blockedSet.add(pos);
  }
  const visited = new Set();

  let queue = [source];
  while (queue.length) {
    const nextLevel = [];
    for (let i = 0; i < queue.length; i++) {
      const [row, col] = queue[i];

      if (row === target[0] && col === target[1]) return true;
      const deltas = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (let delta of deltas) {
        const newRow = row + delta[0];
        const newCol = col + delta[1];
        const rowInBounds = 0 <= newRow && newRow < 1000000;
        const colInBounds = 0 <= newCol && newCol < 1000000;
        const pos = newRow + ',' + newCol;
        if (
          rowInBounds &&
          colInBounds &&
          !visited.has(pos) &&
          !blockedSet.has(pos)
        ) {
          visited.add(pos);
          nextLevel.push([newRow, newCol]);
        }
      }
    }
    queue = nextLevel;
    // if there are more nodes than blocked nodes then we will always be able to reach destination
    if (queue.length > blocked.length) return true;
  }
  return false;
};
