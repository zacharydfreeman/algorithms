/*
There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.


*/

// O(m * n) time | O(m * n) space
const pacificAtlantic = (heights) => {
  const aVisited = new Set();
  const pVisited = new Set();
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      if (col === heights[0].length - 1 || row === heights.length - 1) {
        dfs(heights, row, col, aVisited);
      }
      if (row === 0 || col === 0) {
        dfs(heights, row, col, pVisited);
      }
    }
  }
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const output = [];
  for (let row = 0; row < heights.length; row++) {
    for (let col = 0; col < heights[0].length; col++) {
      let canReachAtlantic = aVisited.has(row + ',' + col);
      let canReachPacific = pVisited.has(row + ',' + col);
      for (let [rD, cD] of deltas) {
        const newRow = row + rD;
        const newCol = col + cD;
        const rowInBounds = 0 <= newRow && newRow < heights.length;
        const colInBounds = 0 <= newCol && newCol < heights[0].length;
        const pos = newRow + ',' + newCol;
        if (
          rowInBounds &&
          colInBounds &&
          heights[row][col] >= heights[newRow][newCol]
        ) {
          if (aVisited.has(pos)) canReachAtlantic = true;
          if (pVisited.has(pos)) canReachPacific = true;
        }
      }
      if (canReachAtlantic && canReachPacific) output.push([row, col]);
    }
  }

  return output;
};

const dfs = (heights, row, col, visited) => {
  const pos = row + ',' + col;
  if (visited.has(pos)) return;
  visited.add(pos);

  const positions = validPos(heights, row, col);
  for (let [neiRow, neiCol] of positions) {
    dfs(heights, neiRow, neiCol, visited);
  }

  return;
};

const validPos = (heights, row, col) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const validPositions = [];

  for (let [rD, cD] of deltas) {
    const newRow = row + rD;
    const newCol = col + cD;
    const rowInBounds = 0 <= newRow && newRow < heights.length;
    const colInBounds = 0 <= newCol && newCol < heights[0].length;
    if (
      !rowInBounds ||
      !colInBounds ||
      heights[newRow][newCol] < heights[row][col]
    )
      continue;
    validPositions.push([newRow, newCol]);
  }

  return validPositions;
};
