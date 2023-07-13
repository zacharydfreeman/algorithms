/*
You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains one less block than the row beneath it and is centered on top.

To make the pyramid aesthetically pleasing, there are only specific triangular patterns that are allowed. A triangular pattern consists of a single block stacked on top of two blocks. The patterns are given as a list of three-letter strings allowed, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.

For example, "ABC" represents a triangular pattern with a 'C' block stacked on top of an 'A' (left) and 'B' (right) block. Note that this is different from "BAC" where 'B' is on the left bottom and 'A' is on the right bottom.
You start with a bottom row of blocks bottom, given as a single string, that you must use as the base of the pyramid.

Given bottom and allowed, return true if you can build the pyramid all the way to the top such that every triangular pattern in the pyramid is in allowed, or false otherwise.

Input: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
Output: true
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 3), we can build "CE" on level 2 and then build "A" on level 1.
There are three triangular patterns in the pyramid, which are "BCC", "CDE", and "CEA". All are allowed.

Input: bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
Output: false
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 4), there are multiple ways to build level 3, but trying all the possibilites, you will get always stuck before building level 1.

*/

const pyramidTransition = (bottom, allowed) => {
  // put allowed into a set
  const allowedSet = new Set(allowed);
  const memo = {};
  const chars = ['A', 'B', 'C', 'D', 'E', 'F'];

  const dfs = (str, row) => {
    // base case if row = 0 return true
    if (row === 0) return true;
    const key = str + ',' + row;
    if (key in memo) return memo[key];
    // generate valid patterns
    let validPatterns = new Set(['']);
    for (let i = 0; i < row; i++) {
      const temp = new Set();
      const left = str[i];
      const right = str[i + 1];
      // now for each char create a potential new row
      for (let char of chars) {
        const potentialRow = left + right + char;
        if (allowedSet.has(potentialRow)) {
          for (let validPattern of validPatterns) {
            temp.add(validPattern + char);
          }
        }
      }
      validPatterns = temp;
    }

    for (let validPattern of validPatterns) {
      if (dfs(validPattern, row - 1)) {
        memo[key] = true;
        return memo[key];
      }
    }

    memo[key] = false;
    return memo[key];
  };
  return dfs(bottom, bottom.length - 1);
};
