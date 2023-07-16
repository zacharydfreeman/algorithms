/* 
Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.

Implement the MagicDictionary class:

MagicDictionary() Initializes the object.
void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings dictionary.
bool search(String searchWord) Returns true if you can change exactly one character in searchWord to match any string in the data structure, otherwise returns false.

Input
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
Output
[null, null, false, true, false, false]

Explanation
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // return False
magicDictionary.search("hhllo"); // We can change the second 'h' to 'e' to match "hello" so we return True
magicDictionary.search("hell"); // return False
magicDictionary.search("leetcoded"); // return False

*/

class MagicDictionary {
  constructor() {
    this.words = [];
  }

  buildDict(dictionary) {
    for (let word of dictionary) {
      this.words.push(word);
    }
  }

  search(word) {
    for (let current of this.words) {
      if (this.compare(current, word)) return true;
    }
    return false;
  }

  compare(s1, s2) {
    if (s1.length !== s2.length) return false;
    let count = 0;
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] !== s2[i]) count++;
    }
    return count === 1;
  }
}

const myDict = new MagicDictionary();
myDict.buildDict(['hello', 'hallo', 'leetcode']);
console.log(myDict.search('hello'));
console.log(myDict.search('hhllo'));
console.log(myDict.search('hell'));
console.log(myDict.search('leetcoded'));
