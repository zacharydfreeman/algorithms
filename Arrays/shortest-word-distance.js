/* 
Given an array of strings wordsDict and two different strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list.

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
Output: 3

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1

*/

// O(n) time | O(1) space
const shortestDistance = (wordsDict, word1, word2) => {
  let oneIdx = -1;
  let twoIdx = -1;
  let res = Infinity;

  for (let i = 0; i < wordsDict.length; i++) {
    if (wordsDict[i] === word1) oneIdx = i;
    if (wordsDict[i] === word2) twoIdx = i;
    if (oneIdx !== -1 && twoIdx !== -1) {
      res = Math.min(res, Math.abs(oneIdx - twoIdx));
    }
  }
  return res;
};
