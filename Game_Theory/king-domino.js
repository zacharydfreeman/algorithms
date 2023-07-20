// # In the game of Kingdomino, players create kingdoms with domino tiles, and at the end of the game you might arrive at a kingdom that looks like above. Each contiguous block of the same type of tile is a property, and the value of each property is the size of it multiplied by the number of crowns within it. The entire kingdom's score is the sum of the scores of each property within it. The castle isn't worth points. A kingdom will never be larger than 5x5, and it could have holes.
// # http://www.meeplemountain.com/wp-content/uploads/2017/05/scoring-example-1.jpg

// # In the kingdom pictured above, the player would have 41 points, made up of...

// # * [#2 on board] 21 points for 7 water tiles with 3 crowns
// # * [#3 on board] 2 points for 1 plain tiles with 2 crowns
// # * [#5 on board] 6 points for 2 swamp tiles with 3 crowns
// # * [#7 on board] 8 points for 4 grain tiles with 2 crowns
// # * [#9 on board] 4 points for 2 mine tiles with 2 crowns
// # * Various properties of different sizes worth 0 points because they have 0 crowns

// board = [
//   "G0 W1 W1 W0 P2",
//   "W0 W0 F0 F0 F0",
//   "W0 W1 F0 S2 S1",
//   "G0 X0 G1 G0 G0",
//   "S0 M2 M0 G1 F0"
// ]

const getScore = (board) => {
  // must check for rectangle
  const matrix = [];
  for (let row of board) {
    const newRow = row.split(' ');
    matrix.push(newRow);
  }

  const colSize = matrix[0].length;
  for (let row of matrix) {
    // console.log(row.length)
    if (row.length !== colSize) throw Error('Invalid board size');
  }
  // keep visited set
  const visited = new Set();
  let score = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const pos = row + ',' + col;
      if (visited.has(pos)) continue;
      const [size, crowns] = dfs(
        matrix,
        row,
        col,
        visited,
        matrix[row][col][0]
      );
      score += size * crowns;
    }
  }
  return score;
};
const deltas = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const dfs = (matrix, row, col, visited, startingChar) => {
  const rowInBounds = 0 <= row && row < matrix.length;
  const colInBounds = 0 <= col && col < matrix[0].length;
  if (!rowInBounds || !colInBounds) return [0, 0];
  const char = matrix[row][col][0];
  if (char !== startingChar) return [0, 0];
  const pos = row + ',' + col;
  if (visited.has(pos)) return [0, 0];
  visited.add(pos);

  let size = 1;
  let crowns = 0;

  crowns += Number(matrix[row][col][1]);
  for (let [rDelta, cDelta] of deltas) {
    const [currSize, currCrowns] = dfs(
      matrix,
      row + rDelta,
      col + cDelta,
      visited,
      startingChar
    );
    size += currSize;
    crowns += currCrowns;
  }

  return [size, crowns];
};
