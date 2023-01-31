/*You have a paper box with dividers for holding wine bottles.
The box is divided by m x n dividers into (m + 1) x (n + 1) cells.
Assuming the depth of the box is 1, each cell has a volume of 1.

Now we want to remove a number of dividers. Find the largest space after removing the dividers.
Example 1:
Input:
n = 5 Number of dividers in the horizontal direction
m = 5 Number of dividers in the vertical direction
h = [2, 3] Horizontal dividers to remove
v = [3] Vertical dividers to remove
Output: 6
Explanation: We want to remove the 2nd and 3rd horizontal divider and the 3rd vertical divider.
The largest space after removing the dividers has a volume of (4 - 1) * (4 - 2) * 1 = 6.

*/
// O(n + m) time | O(n + m + h + v) space
const maxSpace = (n, m, h, v) => {
  const h1 = new Set(h);
  const v2 = new Set(v);
  const horizontalDividers = [];
  const verticalDividers = [];
  for (let i = 0; i <= n + 1; i++) {
    if (!h1.has(i)) horizontalDividers.push(i);
  }
  for (let i = 0; i <= m + 1; i++) {
    if (!v2.has(i)) verticalDividers.push(i);
  }

  let maxHeight = 1;
  let maxWidth = 1;
  for (let i = 1; i < horizontalDividers.length; i++) {
    maxHeight = Math.max(
      maxHeight,
      horizontalDividers[i] - horizontalDividers[i - 1]
    );
  }
  for (let i = 1; i < verticalDividers.length; i++) {
    maxWidth = Math.max(
      maxWidth,
      verticalDividers[i] - verticalDividers[i - 1]
    );
  }

  return maxHeight * maxWidth;
};

console.log(maxSpace(5, 5, [2, 3], [3]));
