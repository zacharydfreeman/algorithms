/**


 */

// Approach: 
class WordDictionary {
    constructor() {
        this.root = {};
        this.endSympol = "*";
    }

    addWord(word) {
        // loop through word
        for (let i = 0; i < word.length; i++) {
            this.insertLetterAt(i, word);
        }

    }

    insertLetterAt(i, word) {
        let current = root;
        let char = word[i];
        while (char in current) {
            current = current[char];
        }
    }

    search(word) {

    }
}

const myWordDictionary = new WordDictionary();
myWordDictionary.addWord('bad');