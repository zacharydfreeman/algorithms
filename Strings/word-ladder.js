/* 
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
*/

// O(m^2 * n) time | O(m^2 * n) space
const ladderLength2 = (beginWord, endWord, wordList) => {
  const words = new Set(wordList);
  const chars = new Set();
  for (let word of wordList) {
    for (let char of word) {
      chars.add(char);
    }
  }
  let queue = [[beginWord, 1]];
  const visited = new Set();
  while (queue.length) {
    const nextLevel = [];
    for (let [word, edits] of queue) {
      if (word === endWord) return edits;
      for (let i = 0; i < word.length; i++) {
        const splitWord = word.split('');
        for (let char of chars) {
          splitWord[i] = char;
          const newWord = splitWord.join('');
          if (!visited.has(newWord) && words.has(newWord)) {
            visited.add(newWord);
            nextLevel.push([newWord, edits + 1]);
          }
        }
      }
    }
    queue = nextLevel;
  }
  return 0;
};
