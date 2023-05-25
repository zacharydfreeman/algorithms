/* 
Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.

Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]


Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.

Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
*/

const fullJustify = (words, maxWidth) => {
  const output = [];
  let currentLine = [];
  // pointer for words
  let i = 0;
  // current width tracker
  let width = 0;
  while (i < words.length) {
    if (words[i].length + width <= maxWidth) {
      width += words[i].length + 1; // the 1 is for the space
      currentLine.push(words[i]);
      i++;
    } else {
      // we need to process current line becuase there is no more width;
      const spacesNeeded = maxWidth - width + currentLine.length;
      let spacesAdded = 0;
      // pointer for the currentLine array
      let j = 0;
      while (spacesAdded < spacesNeeded) {
        // we dont want to add a space to the end so check and set pointer equal to 0
        if (j >= currentLine.length - 1) {
          j = 0;
        }
        // add a space to the current word
        currentLine[j] += ' ';
        // update pointers
        spacesAdded++;
        j++;
      }
      // add processed line to the output array
      output.push(currentLine.join(''));
      // update pointers
      currentLine = [];
      width = 0;
    }
  }
  // we still need to process the last line
  let spacesNeeded = maxWidth - width + currentLine.length;
  for (let i = 0; i < currentLine.length - 1; i++) {
    currentLine[i] += ' ';
    spacesNeeded--;
  }
  // add the leftover spaces to the end
  while (spacesNeeded > 0) {
    currentLine.push(' ');
    spacesNeeded--;
  }
  output.push(currentLine.join(''));
  return output;
};
