/*
In a town, there are n people labeled from 1 to n.
There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:

The town judge trusts nobody.
Everybody (except for the town judge) trusts the town judge.
There is exactly one person that satisfies properties 1 and 2.
You are given an array trust where trust[i] = [ai, bi] representing that the person
labeled ai trusts the person labeled bi.

Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

Input: n = 2, trust = [[1,2]]
Output: 2

Input: n = 3, trust = [[1,3],[2,3]]
Output: 3

Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
 */

// Approach: have an array that includes number of outbound edges and an array that has inbound edges
// the judge will have 0 outbound edges and n - 1 inbound edges
// O(n + e) time | O(n) space
const findJudge = (n, trust) => {
    // declare inbound and outbound arrays
    const inDegree = new Array(n).fill(0);
    const outDegree = new Array(n).fill(0);
    // populate arrays
    for (let pair of trust) {
        [a, b] = pair
        outDegree[a - 1]++;
        inDegree[b - 1]++;
    }
    // declare judge variable
    let judge = -1;
    for (let i = 1; i <= n; i++) {
        if (inDegree[i - 1] === n - 1 && outDegree[i - 1] === 0) judge = i;
    }
    return judge;
}

// Approach: More of a brute force approach
// O(n + e) time | O(n + e) space
const findJudge2 = function(n, trust) {
    if (trust.length === 0) {
        if (n === 1) {
            return n
        } else {
            return -1;
        }
    }
    // create a trust map
    const trustMap = {};
    // populate trust map
    for (let pair of trust) {
        const [a, b] = pair
        if (!(a in trustMap)) trustMap[a] = new Set();
        trustMap[a].add(b);
    }
    // dget potential judge
    let potentialJudge = -1;
    // loop through 1 to n and if n doesnt exist in map, return
    for (let i = 1; i <= n; i++) {
        if (!(i in trustMap)) {
            potentialJudge = i;
            continue;
        }
    }

    // need to check for every key in trust map, includes potential judge
    for (let key in trustMap) {
        if (!trustMap[key].has(potentialJudge)) return -1;
    }
    return potentialJudge;
};
