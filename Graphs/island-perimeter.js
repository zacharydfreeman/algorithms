/**
 * You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.

Input: grid = [[1]]
Output: 4

Input: grid = [[1,0]]
Output: 4
 */

// O(r * c) time | O(r * c) where r is the number of rows and c is the number of columns
const islandPerimeter = (grid) => {
  let perimeter = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col]) {
        // check all directions if there is neighboring land
        if (row + 1 >= grid.length || grid[row + 1][col] === 0) perimeter++;
        if (row - 1 < 0 || grid[row - 1][col] === 0) perimeter++;
        if (col + 1 >= grid[0].length || grid[row][col + 1] === 0) perimeter++;
        if (col - 1 < 0 || grid[row][col - 1] === 0) perimeter++;
      }
    }
  }
  return perimeter;
};
