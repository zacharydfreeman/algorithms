/*
Write a function, islandCount, that takes in a grid containing Ws and Ls.
W represents water and L represents land. The function should return the number of islands on the grid.
An island is a vertically or horizontally connected region of land.

const grid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
];

islandCount(grid); // -> 3
*/

// Approach: loop through graph and then dfs each node. Keep a visited set
// O(r * c) time | O(r * c) space where r is number of rows and c is number of columns
const islandCount = (grid) => {
    // declare a visited set and island counter
    const visited = new Set();
    let islands = 0;
    // loop through grid
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            // if you are at water, there is no need to explore just continue
            if (grid[row][col] === "W") continue
            if (explore(grid, row, col, visited)) islands++;
        }
    }
    return islands;
}

const explore = (grid, row, col, visited) => {
    // check to make sure row and col are valid positions in graph
    const rowInBounds = 0 <= row && row < grid.length;
    const colInBounds = 0 <= col && col < grid[0].length;
    if (!rowInBounds || !colInBounds) return false;

    // create a key and check if in visited
    const key = row + "," + col;
    if (visited.has(key)) return false;
    // add into visited set
    visited.add(key);
    // if current pos is water return false
    if (grid[row][col] === 'W') return false;

    // continue with dfs, exploring each direction
    explore(grid, row + 1, col, visited);
    explore(grid, row - 1, col, visited);
    explore(grid, row, col + 1, visited);
    explore(grid, row, col - 1, visited);
    // after you have explored everything return true
    return true;
}
