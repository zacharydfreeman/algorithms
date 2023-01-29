/*
Given the initial sequence of coins, find the minimum number of coins that can be flipped to obtain
a beautiful sequence. All head facing coins or tails facing coins sequence is also valid
 */

const minCoinFlips = (string) => {
    // initialize flips and number of tails variable
    let flips = 0;
    let tails = 0;
    for (let char of string) {
        if (char === "T") {
            tails++;
        } else if (tails > 0) {
            flips++;
            tails--;

        }
    }
    return flips;
}
