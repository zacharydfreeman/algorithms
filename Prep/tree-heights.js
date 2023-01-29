/*
 Tree Heights
Problem Statement

There are N trees in Jon's backyard and height of tree i is h[i].
Jon doesn't like the appearance of it and is planning to increase and decrease
the height of trees such that the new heights are in strictly increasing order.
Every day he can pick one tree and increase or decrease the height by 1 unit.
Heights can be 0 or even negative (it's a magical world).

Jon has guests coming after X days, hence he wants to know if it is possible to make
heights strictly increasing in no more than X days?

Input format:

First line contains one integer N<=2000 number of trees, X<=5000 number of days Jon has.
Second line contains N space separated integers where ith integer is h[i]

Output Format:

YES or NO, if it is possible to make tree heights in strictly ascending order in no
more than X days, if YES, also print the number of days it will take.

Sample Input 1:

5 13
5 4 3 2 1

Sample Output 1:

YES 12

Explanation:

For the first sample the final array will look like 1 2 3 4 5
Hence the number of days required will be 12.

Sample Input 2:

7 10
7 1 4 10 5 8 12

Sample Output 2:

NO
 */

/*
This problem can be solved using dynamic programming.

First, we can create a 2D array dp of size NxX, where dp[i][j] represents whether it is possible to make the
tree heights strictly increasing from index 0 to i in j days.

We can initialize the dp array with the following values:

dp[i][0] = False for all i, because it is not possible to make the tree heights strictly increasing in 0 days.
dp[0][j] = True for all j, because it is always possible to make the tree height of the first tree strictly
increasing in j days by setting it to any value greater than or equal to h[0].
We can then iterate through the dp array and fill it in using the following transitions:

dp[i][j] = dp[k][j - abs(h[i] - h[k])] for all k < i and abs(h[i] - h[k]) <= j, because we can reach
the current tree i from tree k in j - abs(h[i] - h[k]) days and make the heights strictly increasing.
Finally, we can check if dp[N-1][X] is true, if it is true we can return "YES" and the number of days
 it takes is X. If it is false we can return "NO"
*/

function isPossible(n, x, h) {
    let dp = Array(n).fill(null).map(() => Array(x + 1).fill(false));
    for (let i = 0; i <= x; i++) {
        dp[0][i] = true;
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= x; j++) {
            for (let k = 0; k < i; k++) {
                if (Math.abs(h[i] - h[k]) <= j) {
                    dp[i][j] = dp[i][j] || dp[k][j - Math.abs(h[i] - h[k])];
                }
            }
        }
    }

    if (dp[n - 1][x]) {
        return ["YES", x];
    } else {
        return "NO";
    }
}

const n = 5;
const h = [5, 4, 3, 2, 1];
const x = 13;

console.log(isPossible(n, x, h));
