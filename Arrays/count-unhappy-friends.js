/* 
You are given a list of preferences for n friends, where n is always even.

For each person i, preferences[i] contains a list of friends sorted in the order of preference. In other words, a friend earlier in the list is more preferred than a friend later in the list. Friends in each list are denoted by integers from 0 to n-1.

All the friends are divided into pairs. The pairings are given in a list pairs, where pairs[i] = [xi, yi] denotes xi is paired with yi and yi is paired with xi.

However, this pairing may cause some of the friends to be unhappy. A friend x is unhappy if x is paired with y and there exists a friend u who is paired with v but:

x prefers u over y, and
u prefers x over v.
Return the number of unhappy friends.

Input: n = 4, preferences = [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], pairs = [[0, 1], [2, 3]]
Output: 2
Explanation:
Friend 1 is unhappy because:
- 1 is paired with 0 but prefers 3 over 0, and
- 3 prefers 1 over 2.
Friend 3 is unhappy because:
- 3 is paired with 2 but prefers 1 over 2, and
- 1 prefers 3 over 0.
Friends 0 and 2 are happy.

Input: n = 2, preferences = [[1], [0]], pairs = [[1, 0]]
Output: 0
Explanation: Both friends 0 and 1 are happy.

Input: n = 4, preferences = [[1, 3, 2], [2, 3, 0], [1, 3, 0], [0, 2, 1]], pairs = [[1, 3], [0, 2]]
Output: 4


*/

// O(np + n + pa) time | O(n) space where n is the number of people p is the length of preferences array and pa is the length of pairs array
const unhappyFriends = (n, preferences, pairs) => {
  // create pairs map
  const pairsMap = {};
  const preferenceMap = {};
  for (let [a, b] of pairs) {
    pairsMap[a] = b;
    pairsMap[b] = a;
  }
  for (let i = 0; i < n; i++) {
    preferenceMap[i] = new Set();
  }

  for (let i = 0; i < n; i++) {
    const pair = pairsMap[i];
    const preference = preferences[i];
    const idx = preference.indexOf(pair);
    for (let j = 0; j < idx; j++) {
      preferenceMap[i].add(preference[j]);
    }
  }
  const visited = new Set();
  let unhappy = 0;
  for (let i = 0; i < n; i++) {
    const prefs = preferenceMap[i];
    for (let pref of prefs) {
      if (preferenceMap[pref].has(i) && !visited.has(i)) {
        visited.add(i);
        unhappy++;
      }
    }
  }
  return unhappy;
};
