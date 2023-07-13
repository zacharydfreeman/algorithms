/*
Design a special dictionary that searches the words in it by a prefix and a suffix.

Implement the WordFilter class:

WordFilter(string[] words) Initializes the object with the words in the dictionary.
f(string pref, string suff) Returns the index of the word in the dictionary, which has the prefix pref and the suffix suff. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.

Input
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
Output
[null, 0]
Explanation
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = "e".


*/

class WordFilter {
  constructor(words) {
    this.prefixRoot = {};
    this.suffixRoot = {};
    this.endSymbol = '*';
    this.populatePrefixTree(words);
    this.populateSuffixTree(words);
  }

  populatePrefixTree(words) {
    for (let word of words) {
      for (let i = 0; i < word.length; i++) {
        this.insert(0, i, word, this.prefixRoot);
      }
    }
  }

  populateSuffixTree(words) {
    for (let word of words) {
      for (let i = 0; i < word.length; i++) {
        this.insert(i, word.length - 1, word, this.suffixRoot);
      }
    }
  }

  insert(startIdx, endIdx, word, root) {
    let current = root;

    for (let i = startIdx; i <= endIdx; i++) {
      const char = word[i];
      if (!(char in current)) current[char] = {};
      current = current[char];
    }

    current[this.endSymbol] = true;
  }

  f(pre, suff) {}
}
