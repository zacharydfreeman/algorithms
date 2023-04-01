/* excel columns */

// O(n) time | O(1) space
const excel = (str) => {
  let number = 0;
  // iterate through the string
  for (let i = 0; i < str.length; i++) {
    // grab current char
    const char = str[i];
    // multiply current num by 26
    number *= 26;
    // get the "distance"
    number += char.charCodeAt() - 'A'.charCodeAt() + 1;
  }
  return number;
};
