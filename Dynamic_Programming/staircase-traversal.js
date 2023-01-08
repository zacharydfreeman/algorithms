/*
You're given two positive integers representing the height of a staircase and the max number of steps
that you can advance up the staircase at a time.

Write a function that returns the number of ways in which you can climb the staircase.

For example, if you were given a staircae of height = 3 and maxSteps = 2 you could climb
the staircase in 3 ways.
You could take 1 step, 1 step, then 1 step, you could also take 1 step, then 2 steps
and you could take 2 steps, then 1 step.

Note that maxSteps <= height will always be true

Input: height = 4, maxSteps = 2
Output: 5
You can climb the staircase in the following ways
1, 1, 1, 1
1, 1, 2
1, 2, 1
2, 1, 1
2, 2
*/

// Sliding Window + Tabulation
// O(n) time | O(n) space where n is height of staircase
const staircaseTraversal1 = (height, maxSteps) => {
    // initialize array of length height + 1
    const ways = new Array(height + 1).fill(0);
    // set num of ways of height 0 to 1
    ways[0] = 1;
    // initialize window to be ways[0]
    let window = ways[0];

    for (let i = 1; i < ways.length; i++) {
        // add window to your current height in ways array
        ways[i] += window;
        // update your window
        window += ways[i];
        if (i >= maxSteps) window -= ways[i - maxSteps]; // only want to subtract from window if current height > maxsteps
    }

    return ways[height];
}

// Tabulation
// O(n * k) time | O(n) space where n is height of staircase and k is number of steps
const staircaseTraversal2 = (height, maxSteps) => {
    // initialize array of size height + 1
    const ways = new Array(height + 1).fill(0);
    // set number of ways to climb a height of 0 and 1 to 1
    ways[0] = 1;
    ways[1] = 1;

    // i is current height, j is prior height
    for (let i = 2; i < ways.length; i++) {
        for (let j = i - maxSteps; j < i; j++) {
            if (j < 0) continue; // if prior height is less than 0 continue
            ways[i] += ways[j]; // number of ways at current height += num of ways at prior height
        }
    }

    return ways[height];
}


// Memoization
// O(n * k) time | O(n) space where n is height of staircase and k is number of steps
const staircaseTraversal3 = (height, maxSteps, memo = {}) => {
    // memoization
    if (height in memo) return memo[height];
    // base cases => if height == 0 there is 1 way and if height < 0 there are 0 ways
    if (height === 0) return 1;
    if (height < 0) return 0;

    // declare numWays variable
    let numWays = 0;

    for (let step = 1; step <= maxSteps; step++) {
        // add to numWays recursive call with new height and maxsteps
        numWays += staircaseTraversal3(height - step, maxSteps);
    }

    // cache result
    memo[height] = numWays;
    return numWays;
}
