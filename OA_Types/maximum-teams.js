/*

Amazon is hosting a team hackathon.

Each team will have exactly teamSize developers.
A developer's skill level is denoted by skill[i].
The difference between the maximum and minimum skill levels within a team cannot exceed a threshold, maxDiff.
Determine the maximum number of teams that can be formed from the contestants.

Example
skill = [3, 4, 3, 1, 6, 5], teamSize = 3, maxDiff = 2:
At most, 2 teams can be formed: [3, 3, 1] and [4, 6, 5].
The difference between the maximum and minimum skill levels is 2 in each case,
which does not exceed the threshold value of 2.


 */

// Approach: Sort to be able to easily determine if group is valid. [1, 3, 3, 4, 5, 6]
// O(nlog(n)) time | O(1) space
const teams = (skill, size, diff) => {
  // sort
  skill.sort((a, b) => a - b);
  let groups = 0;
  let i = size - 1;

  while (i < skill.length) {
    // check if current team is possible
    if (skill[i] - skill[i - size + 1] <= diff) {
      groups++;
      i += size - 1;
    } else {
      i++;
    }
  }

  return groups;
};
