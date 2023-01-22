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

const reorderLogFiles = (logs) => {
    // declare two arrays to hold digits and letters
    const digits = [];
    const letters = [];

    for (let log of logs) {
        // we need to determine which array to put log in
        const char = log[log.indexOf(" ") + 1];
        if (Number(char) == char) {
            digits.push(log);
        } else {
            letters.push(log);
        }
    }

    letters.sort(function compare(log1, log2) {
        const logOne = [log1.slice(0, log1.indexOf(" ")), log1.slice(log1.indexOf(" ") + 1)];
        const logTwo = [log2.slice(0, log2.indexOf(" ")), log2.slice(log2.indexOf(" ") + 1)];
        const logOneString = logOne[1].split(" ").join("");
        const logTwoString = logTwo[1].split(" ").join("");

        if (logOneString < logTwoString) {
            return - 1;
        } else if (logOneString > logTwoString) {
            return 1;
        } else {
            // you need to get the number
            const [logOneNum, logOneNumIdx] = createNum(logOne[0]);
            const [logTwoNum, logTwoNumIdx] = createNum(logTwo[0]);
            // you only sort by number if the key are the same so we need to get the key
            const logOneKey = logOne[0].slice(0, logOneNumIdx);
            const logTwoKey = logTwo[0].slice(0, logTwoNumIdx);

            if (logOneKey !== logTwoKey) {
                if (logOneKey < logTwoKey) {
                    return -1;
                } else {
                    return 1
                }
            } else {
                return logOneNum - logTwoNum;
            }
        }

    })

    return letters.concat(digits);

}

const createNum = (string) => {
    let num = "";
    let firstNumIdx = null
    for (let i = 0; i < string.length; i++) {
        if (string[i] == Number(string[i])) {
            num += string[i];
            if (!firstNumIdx) firstNumIdx = i;
        }
    }

    return [Number(num), firstNumIdx];
}

const logs = ["j mo", "5 m w", "g 07", "o 2 0", "t q h"];
// ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
console.log(reorderLogFiles(logs))
