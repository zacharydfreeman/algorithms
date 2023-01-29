/*
You are given an array of logs. Each log is a space-delimited string of words,
where the first word is the identifier.

There are two types of logs:

Letter-logs: All words (except the identifier) consist of lowercase English letters.
Digit-logs: All words (except the identifier) consist of digits.
Reorder these logs so that:

The letter-logs come before all digit-logs.
The letter-logs are sorted lexicographically by their contents.
If their contents are the same, then sort them lexicographically by their identifiers.
The digit-logs maintain their relative ordering.
Return the final order of the logs.

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
Explanation:
The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".

Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
 */

// O(nlog(n)) time | O(n)space
const reorderLogFiles = (logs) => {
    // declare two arrays that will hold letters and digits
    const letters = [];
    const numbers = [];
    // split up logs
    for (let log of logs) {
        const words = log.split(" ");
        // we are just removing the first item in the array so we can easily determine if letter or num log
        const identifier = words.shift();
        // check if firs character is a number
        if (!isNaN(words[0])) {
            numbers.push(log);
        } else {
            letters.push(log);
        }
    }
    // custom comparator
    letters.sort((a, b) => {
        // split into an array for easier manipulation
        let log1Words = a.split(" ");
        let log2Words = b.split(" ");
        // remove the identifier and join string with an empty space becuase there could be
        // a case like "m ad" and "ma d". In this case, the strings would be equal if we didnt join
        // without a " " and we would get incorrect solution
        let log1Content = log1Words.slice(1).join(" ");
        let log2Content = log2Words.slice(1).join(" ");
        // if the strings equal, we sort alphabetically
        if (log1Content === log2Content) {
            return log1Words[0].localeCompare(log2Words[0]);
        } else {
            return log1Content.localeCompare(log2Content);
        }
    })

    return letters.concat(numbers);
}
