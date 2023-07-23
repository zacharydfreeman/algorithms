/* 
You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

Input: tiles = "AAABBC"
Output: 188

Input: tiles = "V"
Output: 1

*/

const numTilePossibilities = (tiles) => {
  const counts = {};
  for (let char of tiles) {
    counts[char] = counts[char] + 1 || 1;
  }
  let count = 0;
  const dfs = () => {
    for (let char in counts) {
      if (counts[char] <= 0) continue;
      counts[char]--;
      count++;
      dfs();
      counts[char]++;
    }
  };
  dfs();
  return count;
};
