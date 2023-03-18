/*
Implement a trie class
 */

class Trie {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  insert(word) {
    let current = this.root;
    for (let char of word) {
      if (char in current) {
        current = current[char];
      } else {
        current[char] = {};
        current = current[char];
      }
    }
    current[this.endSymbol] = true;
  }

  search(word) {
    let current = this.root;
    for (let char of word) {
      if (!(char in current)) return false;
      current = current[char];
    }

    return this.endSymbol in current;
  }

  startsWith(prefix) {
    let current = this.root;
    for (let char of prefix) {
      if (!(char in current)) return false;
      current = current[char];
    }

    return true;
  }
}

const trie = new Trie();
trie.insert('apple');

console.log(trie.root);
console.log(trie.startsWith('appp'));
