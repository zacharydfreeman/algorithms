/*
Amazon Technical Academy provides in-demand, tehcnical training to current
Amazon employees looking to broaden their skill sets. ATA has admited a group of
n prospectives trainees with varying skills. To better accomodate the trainees,
ATA has decided to create classes tailored to the skills levels.
A placement examination will return a skill level that will be used to group the
trainees into calsses, where levels[i] represent the skill level of trainee i.
All traines within a clas smust have a skill level within the maxSpread.

Determine the min number of classes that must be formed

Sample input:
const levels = [1, 4, 7, 3, 4]
const spread = 2

Sample output:
3
 */

//[1, 3, 4, 4, 7]
const minClasses = (levels, spread) => {
  levels.sort((a, b) => a - b);
  let groups = 1;
  let minLevel = levels[0];
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - minLevel >= spread) {
      groups++;
      minLevel = levels[i];
    }
  }
  return groups;
};

const levels = [1, 4, 7, 3, 4];
const spread = 2;

console.log(minClasses(levels, spread));
