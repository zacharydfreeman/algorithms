/**
 * Implement a BK tree for spell checking
 */

class Node {
  constructor(word) {
    this.word = word;
    this.children = {};
  }
}

class BKTree {
  constructor(dictionary) {
    this.root = new Node(dictionary[0]);
    for (let i = 1; i < dictionary.length; i++) {
      this.addNode(this.root, dictionary[i]);
    }
  }

  addNode(node, word) {
    const distance = LevenshteinDistance(node.word, word);
    if (node.children[distance]) {
      this.addNode(node.children[distance], word);
    } else {
      node.children[distance] = new Node(word);
    }
  }

  search(word, threshold, node = this.root, results = []) {
    const distance = LevenshteinDistance(node.word, word);
    if (distance <= threshold) {
      results.push(node.word);
    }
    for (let i = distance - threshold; i <= distance + threshold; i++) {
      if (node.children[i]) {
        this.search(word, threshold, node.children[i], results);
      }
    }
    return results;
  }
}

const LevenshteinDistance = (word1, word2) => {
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
