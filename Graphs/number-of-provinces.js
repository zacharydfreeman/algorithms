/* 
There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
*/

const findCircleNum = (isConnected) => {
  // declare visited set and count
  const visited = new Set();
  let count = 0;
  for (let i = 0; i < isConnected.length; i++) {
    if (dfs(i, isConnected, visited)) count++;
  }
  return count;
};

const dfs = (start, isConnected, visited) => {
  if (visited.has(start)) return false;
  visited.add(start);
  for (let i = 0; i < isConnected[start].length; i++) {
    if (i === start) continue;
    if (isConnected[start][i] === 1) {
      dfs(i, isConnected, visited);
    }
  }
  return true;
};

const isConnected = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];

console.log(findCircleNum(isConnected));
