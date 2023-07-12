/*
Given an array of strings wordsDict and two strings that already exist in the array word1 and word2, return the shortest distance between the occurrence of these two words in the list.

Note that word1 and word2 may be the same. It is guaranteed that they represent two individual words in the list.

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "makes"
Output: 3

*/

// O(n) time | O(n) space
const shortestWordDistance = (wordsDict, word1, word2) => {
  const wordsMap = {};
  for (let i = 0; i < wordsDict.length; i++) {
    const word = wordsDict[i];
    if (!(word in wordsMap)) wordsMap[word] = [];
    wordsMap[word].push(i);
  }
  const idxs1 = wordsMap[word1];
  const idxs2 = wordsMap[word2];

  let i = 0;
  let j = 0;
  let minDistance = Infinity;

  while (i < idxs1.length && j < idxs2.length) {
    const idx1 = idxs1[i];
    const idx2 = idxs2[j];
    if (idx1 !== idx2) {
      minDistance = Math.min(minDistance, Math.abs(idx1 - idx2));
      if (idx1 < idx2) {
        i++;
      } else {
        j++;
      }
    } else {
      j++;
    }
  }

  return minDistance;
};
