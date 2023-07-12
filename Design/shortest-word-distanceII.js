/* 
Design a data structure that will be initialized with a string array, and then it should answer queries of the shortest distance between two different strings from the array.

Implement the WordDistance class:

WordDistance(String[] wordsDict) initializes the object with the strings array wordsDict.
int shortest(String word1, String word2) returns the shortest distance between word1 and word2 in the array wordsDict.

Input
["WordDistance", "shortest", "shortest"]
[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
Output
[null, 3, 1]

Explanation
WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
wordDistance.shortest("coding", "practice"); // return 3
wordDistance.shortest("makes", "coding");    // return 1

*/

class WordDistance {
  constructor(wordsDict) {
    this.wordMap = {};
    for (let i = 0; i < wordsDict.length; i++) {
      if (!(wordsDict[i] in this.wordMap)) this.wordMap[wordsDict[i]] = [];
      this.wordMap[wordsDict[i]].push(i);
    }
  }

  shortest(word1, word2) {
    const idxs1 = this.wordMap[word1];
    const idxs2 = this.wordMap[word2];

    let i = 0;
    let j = 0;
    let shortest = Infinity;

    while (i < idxs1.length && j < idxs2.length) {
      const idx1 = idxs1[i];
      const idx2 = idxs2[j];

      shortest = Math.min(shortest, Math.abs(idx1 - idx2));

      if (idx1 < idx2) {
        i++;
      } else {
        j++;
      }
    }

    return shortest;
  }
}
