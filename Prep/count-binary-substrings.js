/*

Given a binary string s, return the number of non-empty substrings that have the same number of 0's and 1's,
and all the 0's and all the 1's in these substrings are grouped consecutively.

Substrings that occur multiple times are counted the number of times they occur.

Input: s = "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's:
 "0011", "01", "1100", "10", "0011", and "01".
Notice that some of these substrings repeat and are counted the number of times they occur.
Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.

Input: s = "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.
 */

// Approach: Same approach as solution 2 but opitmized with two pointer variables
const countBinarySubstrings = (s) => {
    let prev = 0;
    let current = 1;
    let substrings = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            current++;
        } else {
            substrings += Math.min(current, prev);
            prev = current;
            current = 1
        }
    }
    return substrings + Math.min(current, prev);
}




// Approach: Two pointers
// '110001110100'
// [2, 3, 3, 1, 1, 2] => answer is min of every consecutive pair of groups
// O(n) time | O(n) space
const countBinarySubstrings2 = (s) => {
    // create groups array
    const groups = [];
    for (let i = 0; i < s.length; i++) {
        if (i === 0 || s[i] !== s[i - 1]) {
            groups.push(1);
        } else {
            groups[groups.length - 1]++;
        }
    }

    let substrings = 0;
    for (let i = 1; i < groups.length; i++) {
        substrings += Math.min(groups[i - 1], groups[i]);
    }
    return substrings;
}



// Brute force approach
// O(n^3) time | O(1) space
const countBinarySubstrings3 = (s) => {
    let count = 0;
    for (let i = 0; i < s.length - 1; i++) {
        for (let j = i + 1; j < s.length; j++) {
            if (isValid(i, j, s)) {
                count++;
            }
        }
    }
    return count;
}

const isValid = (startIdx, endIdx, s) => {
    let i = startIdx;
    let j = endIdx;
    while (i <= j) {
        if (s[i] === s[j]) return false;
        if (i > startIdx) {
            if (s[i] !== s[i - 1]) return false;
        }
        i++;
        j--;
    }
    return true;
}


