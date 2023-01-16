/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Input: n = 1
Output: ["()"]
*/

// Approach: Brute-froce approach would be to generate all possible combinations and then check if valid
// More optimal solution would be to only generate valid combos
// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space
const generateParenthesis = (n) => {
    // delcare combos array
    const combos = [];
    // recursive helper function that will take empty string,
    // how many opening and closing parens you have and combos
    getCombos("", n, n, combos);
    return combos;
}

const getCombos = (prefix, openingParenthesis, closingParenthesis, combos) => {
    // base case => if there are no more opening and closing parenthesis
    if (openingParenthesis === 0 && closingParenthesis === 0) combos.push(prefix);
    // if there are any opening parenthesis, place it
    if (openingParenthesis > 0) {
        getCombos(prefix + '(', openingParenthesis - 1, closingParenthesis, combos)
    }
    // if opening < closing, then a closing parenthesis can be placed
    if (openingParenthesis < closingParenthesis) {
        getCombos(prefix + ')', openingParenthesis, closingParenthesis - 1, combos);
    }
}
