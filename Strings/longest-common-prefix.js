/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Input: strs = ["flower","flow","flight"]
Output: "fl"

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 */

// O(n*m) time | O(m) space where n is length of strs array and m is length of longest string
const longestCommonPrefix = (strs) => {
    let output = "";
    let idx = 0;
    // you can go until an arbitray string length
    while (idx < strs[0].length) {
        for (let i = 1; i < strs.length; i++) {
            if (strs[i][idx] !== strs[i - 1][idx]) return output;
        }
        output += strs[0][idx]
        idx++;
    }

    return output;
}

const strs = ["flower","flow","flight"]
console.log(longestCommonPrefix([""]));
