/*
You are given an array of strings ideas that represents a list of names to be used in the process of naming a company. The process of naming a company is as follows:

Choose 2 distinct names from ideas, call them ideaA and ideaB.
Swap the first letters of ideaA and ideaB with each other.
If both of the new names are not found in the original ideas, then the name ideaA ideaB (the concatenation of ideaA and ideaB, separated by a space) is a valid company name.
Otherwise, it is not a valid name.
Return the number of distinct valid names for the company.

Input: ideas = ["coffee","donuts","time","toffee"]
Output: 6
Explanation: The following selections are valid:
- ("coffee", "donuts"): The company name created is "doffee conuts".
- ("donuts", "coffee"): The company name created is "conuts doffee".
- ("donuts", "time"): The company name created is "tonuts dime".
- ("donuts", "toffee"): The company name created is "tonuts doffee".
- ("time", "donuts"): The company name created is "dime tonuts".
- ("toffee", "donuts"): The company name created is "doffee tonuts".
Therefore, there are a total of 6 distinct company names.

The following are some examples of invalid selections:
- ("coffee", "time"): The name "toffee" formed after swapping already exists in the original array.
- ("time", "toffee"): Both names are still the same after swapping and exist in the original array.
- ("coffee", "toffee"): Both names formed after swapping already exist in the original array.

Input: ideas = ["lack","back"]
Output: 0
Explanation: There are no valid selections. Therefore, 0 is returned.
 */

// O(n * m) time | O(n * m) space where n is length of ideas array and m is longest word in ideas array
const distinctNames = (ideas) => {
  // create a map of chars that point to set of suffixes
  const map = {};
  for (let idea of ideas) {
    if (!(idea[0] in map)) map[idea[0]] = new Set();
    map[idea[0]].add(idea.slice(1));
  }

  // declare names variable and loop through each char in map to let at all combos
  let names = 0;
 
  for (let char1 in map) {
    for (let char2 in map) {
      // if same char, continue
      if (char1 === char2) continue;
      // we need to get how many suffixes exists in both value sets
      let overlap = 0;
      for (let suffix1 of map[char1]) {
        if (map[char2].has(suffix1)) {
          overlap++;
        }
      }
      // get how many distinct words in both sets
      const wordsOne = map[char1].size - overlap;
      const wordsTwo = map[char2].size - overlap;
      // multiply numbers together to get combos and add to names
      names += wordsOne * wordsTwo;
    }
  }
  return names;
};

// O(n^2*m) time | O(n + m) space where n is length ideas array and m is length of longest word
const distinctNames2 = (ideas) => {
  const set = new Set(ideas);
  let count = 0;
  for (let i = 0; i < ideas.length; i++) {
    for (let j = 0; j < ideas.length; j++) {
      const newWordOne = ideas[j].slice(0, 1) + ideas[i].slice(1);
      const newWordTwo = ideas[i].slice(0, 1) + ideas[j].slice(1);
      if (!set.has(newWordOne) && !set.has(newWordTwo)) count++;
    }
  }
  return count;
};
