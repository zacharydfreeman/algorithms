/*
Write a function tht takes in a positive integer numberOfTags
and returns a list of all the valid strings that you can generate
with that number of matched <div></div>

*/

// Approach: Brute-froce approach would be to generate all possible combinations and then check if valid
// More optimal solution would be to only generate valid combos of div tags
// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space
const generateDivTags = (numberOfTags) => {
    // delcare combos array
    const combos = [];
    // recursive helper function that will take empty string,
    // how many opening and closing parens you have and combos
    getCombos("", numberOfTags, numberOfTags, combos);
    return combos;
}

const getCombos = (prefix, openingTags, closingTags, combos) => {
    // base case => if there are no more opening and closing parenthesis
    if (openingTags === 0 && closingTags === 0) combos.push(prefix);
    // if there are any opening parenthesis, place it
    if (openingTags > 0) {
        getCombos(prefix + '<div>', openingTags - 1, closingTags, combos)
    }
    // if opening < closing, then a closing parenthesis can be placed
    if (openingTags < closingTags) {
        getCombos(prefix + '</div>', openingTags, closingTags - 1, combos);
    }
}
