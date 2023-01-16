/*
Write a function that, given a string, returns its longest palindromic substring

Input: "abaxyzzyxf"
Output: "xyzzyx"
*/

// O(n^2) time | O(n) space
const longestPalindromicSubstring = (string) => {
   // declare index variable that will be length of longest current palindrome
   let index = [0, 1];
   // loop through string and at even character, check for even and odd palindrome
   for (let i = 1; i < string.length; i++) {
    // get odd and even palindrome length in form of []
    const oddLength = getPalindromeLength(string, i - 1, i + 1);
    const evenLength = getPalindromeLength(string, i - 1, i);
    // seeing which palindrome is bigger
    const longest = oddLength[1] - oddLength[0] > evenLength[1] - evenLength[0] ? oddLength : evenLength;
    // update index if longest is bigger than current index
    index = index[1] - index[0] > longest[1] - longest[0] ? index : longest
   }
   return string.slice(index[0], index[1]);
}

// gets indices of palindrome
const getPalindromeLength = (string, leftIdx, rightIdx) => {
    let l = leftIdx;
    let r = rightIdx;
    while (string[l] === string[r] && l >= 0 && r < string.length) {
        l--;
        r++;
    }
    return [l + 1, r];
}




// O(n^3) time | O(n) space where n is length of string
const longestPalindromicSubstring2 = (string) => {
    // declare index variable that will be length of longest current palindrome
    let index = [0, 1];
    // check every possible substring
    for (let i = 0; i < string.length; i++) {
        for (let j = string.length - 1; j >= i; j--) {
            // check if substring is palindrome
            if (isPalindrome(string, i, j)) {
                const currentLength = j - i + 1; // length of current palindrome
                const maxLength = index[1] - index[0];
                if (currentLength > maxLength) {
                    index[0] = i;
                    index[1] = j;
                }
            }
        }
    }
    return string.slice(index[0], index[1] + 1);
}

// O(n) time | O(1) space
const isPalindrome = (string, startIdx, endIdx) => {
    let l = startIdx;
    let r = endIdx;
    while (l <= r) {
        if (string[l] !== string[r]) return false;
        l++;
        r--;
    }
    return true;
}
