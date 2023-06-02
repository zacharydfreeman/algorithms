/*
You are given a list of bombs. The range of a bomb is defined as the area where its effect can be felt. This area is in the shape of a circle with the center as the location of the bomb.

The bombs are represented by a 0-indexed 2D integer array bombs where bombs[i] = [xi, yi, ri]. xi and yi denote the X-coordinate and Y-coordinate of the location of the ith bomb, whereas ri denotes the radius of its range.

You may choose to detonate a single bomb. When a bomb is detonated, it will detonate all bombs that lie in its range. These bombs will further detonate the bombs that lie in their ranges.

Given the list of bombs, return the maximum number of bombs that can be detonated if you are allowed to detonate only one bomb.

Input: bombs = [[2,1,3],[6,1,4]]
Output: 2
Explanation:
The above figure shows the positions and ranges of the 2 bombs.
If we detonate the left bomb, the right bomb will not be affected.
But if we detonate the right bomb, both bombs will be detonated.
So the maximum bombs that can be detonated is max(1, 2) = 2.

Input: bombs = [[1,1,5],[10,10,5]]
Output: 1
Explanation:
Detonating either bomb will not detonate the other bomb, so the maximum number of bombs that can be detonated is 1.

Input: bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]
Output: 5
Explanation:
The best bomb to detonate is bomb 0 because:
- Bomb 0 detonates bombs 1 and 2. The red circle denotes the range of bomb 0.
- Bomb 2 detonates bomb 3. The blue circle denotes the range of bomb 2.
- Bomb 3 detonates bomb 4. The green circle denotes the range of bomb 3.
Thus all 5 bombs are detonated.

*/

//O(n^3) time | O(n^2) space
const maximumDetonation = (bombs) => {
  // convert to graph
  const graph = {};
  for (let i = 0; i < bombs.length; i++) {
    for (let j = 0; j < bombs.length; j++) {
      if (!(i in graph)) graph[i] = [];
      if (!(j in graph)) graph[j] = [];
      if (i === j) continue;
      const [x1, y1, r1] = bombs[i];
      const [x2, y2, r2] = bombs[j];

      if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <= Math.pow(r1, 2)) {
        graph[i].push(j);
      }
    }
  }

  let count = 0;

  for (let i = 0; i < bombs.length; i++) {
    count = Math.max(count, dfs(graph, i, new Set()));
  }
  return count;
};

const dfs = (graph, start, visited) => {
  if (visited.has(start)) return 0;
  visited.add(start);
  let count = 1;
  for (let nei of graph[start]) {
    count += dfs(graph, nei, visited);
  }
  return count;
};
