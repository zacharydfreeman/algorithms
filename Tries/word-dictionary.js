/**
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True

 */

// Approach:
class WordDictionary {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  addWord(word) {
    let current = this.root;
    for (let char of word) {
      if (!(char in current)) {
        current[char] = {};
        current = current[char];
      } else {
        current = current[char];
      }
    }
    current[this.endSymbol] = true;
  }

  search(word, i = 0, current = this.root) {
    console.log('hey');
    if (word.length === i && this.endSymbol in current) return true;
    const char = word[i];
    if (char !== '.' && !(char in current)) return false;
    if (char === '.') {
      for (let key in current) {
        if (this.search(word, i + 1, current[key])) return true;
      }
    } else {
      if (this.search(word, i + 1, current[char])) return true;
    }
    return false;
  }
}

const myWordDictionary = new WordDictionary();
myWordDictionary.addWord('bad');
myWordDictionary.addWord('dad');
myWordDictionary.addWord('mad');
myWordDictionary.search('bad');
