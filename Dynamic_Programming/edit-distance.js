/*
Implement Levenshtein Distance

Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character

 */

// 2D Dynamic Programming
// O(n*m) time | O(n*m) space
const minDistance = (word1, word2) => {
  const edits = [];
  for (let row = 0; row <= word1.length; row++) {
    const newRow = [];
    for (let col = 0; col <= word2.length; col++) {
      newRow.push(col);
    }
    newRow[0] = row;
    edits.push(newRow);
  }

  for (let row = 1; row <= word1.length; row++) {
    for (let col = 1; col <= word2.length; col++) {
      if (word1[row - 1] === word2[col - 1]) {
        edits[row][col] = edits[row - 1][col - 1];
      } else {
        edits[row][col] =
          1 +
          Math.min(
            edits[row - 1][col - 1],
            edits[row - 1][col],
            edits[row][col - 1]
          );
      }
    }
  }

  return edits[word1.length][word2.length];
};
