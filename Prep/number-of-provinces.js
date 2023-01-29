/*
There are n cities. Some of them are connected, while some are not.
If city a is connected directly with city b, and city b is connected directly with city c,
then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city
and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3

*/

// Approach: this is essentially a connected components graph problem

// O(n^2) time | O(n) space
const findCircleNum = function(isConnected) {
    // declare a visited set and groups count variable
    const visited = new Set();
    let groups = 0;
    // loop through each city and perform a dfs
    for (let city = 0; city < isConnected.length; city++) {
        if (dfs(isConnected, city, visited)) groups++;
    }
    return groups;
};

const dfs = (cities, start, visited) => {
    // if start is in visited return false
    if (visited.has(start)) return false;
    visited.add(start);
    // explore neighbors
    for (let i = 0; i < cities[start].length; i++) {
        // if i is not the start and the neightbor is 1, then explore that neighbor
        if (i !== start && cities[start][i]) dfs(cities, i, visited);
    }
    // return true if you make it to end
    return true;
}
