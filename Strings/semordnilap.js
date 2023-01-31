/*
Write a function that takes in a list of unique string and returns a list of semordinlap
pairs.

word = ['diaper', 'abc', 'test', 'cba', 'repaid']
output = [[diaper, repaid], [abc, cba]]
*/

// O(n * m) time | O(n * m) space where n is length of array and m is length of longest word
const semordnilap = (words) => {
  // declare words and output array
  const map = {};
  const output = [];
  for (let word of words) {
    // get palindrome and check if in map
    const palindrome = word.split("").reverse().join("");
    if (palindrome in map) {
      output.push([palindrome, word]);
    } else {
      map[word] = true;
    }
  }
  return output;
};
