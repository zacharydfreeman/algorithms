/*
There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary, where the strings in words are 
sorted lexicographically
 by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.

Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"

Input: words = ["z","x"]
Output: "zx"

Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".
*/

// O(c) time | O(1) space where c is the number of characters
const alienOrder = (words) => {
  // build graph
  const graph = {};
  // put all chars in graph.
  for (let word of words) {
    for (let char of word) {
      if (!(char in graph)) graph[char] = [];
    }
  }
  for (let i = 1; i < words.length; i++) {
    const word1 = words[i - 1];
    const word2 = words[i];
    if (word1.length > word2.length && word1.startsWith(word2)) return '';
    // get the smaller word
    let length = word1.length < word2.length ? word1.length : word2.length;
    for (let j = 0; j < length; j++) {
      if (word1[j] !== word2[j]) {
        graph[word1[j]].push(word2[j]);
        break;
      }
    }
  }
  // perform post order dfs
  const order = [];
  const visited = new Set();
  const visiting = new Set();
  for (let char in graph) {
    if (!dfs(graph, char, visited, visiting, order)) return '';
  }
  return order.reverse().join('');
};

const dfs = (graph, node, visited, visiting, order) => {
  if (visiting.has(node)) return false;
  if (visited.has(node)) return true;

  visiting.add(node);

  for (let nei of graph[node]) {
    if (!dfs(graph, nei, visited, visiting, order)) return false;
  }
  visiting.delete(node);
  visited.add(node);
  order.push(node);
  return true;
};
