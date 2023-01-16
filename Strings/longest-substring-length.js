/*
Given a string s, find the length of the longest
substring without repeating characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
*/

// O(n) time | O(min(n, a)) space where n is length of string and a is number of characters in alphabet
const lengthOfLongestSubstring = (s) => {
    const lastSeen = {};
    let longest = 0;
    let startIdx = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        // check to see if in seen and update start accordingly
        if (char in lastSeen) {
            startIdx = Math.max(startIdx, lastSeen[char] + 1);
        }
        // update longest
        longest = Math.max(longest, (i - startIdx + 1));
        // update char in seen map
        lastSeen[char] = i;
    }
    return longest;
}
