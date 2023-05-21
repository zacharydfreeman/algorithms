/*
You are given a 0-indexed 2D integer array peaks where peaks[i] = [xi, yi] states that mountain i has a peak at coordinates (xi, yi). A mountain can be described as a right-angled isosceles triangle, with its base along the x-axis and a right angle at its peak. More formally, the gradients of ascending and descending the mountain are 1 and -1 respectively.

A mountain is considered visible if its peak does not lie within another mountain (including the border of other mountains).

Return the number of visible mountains.

Input: peaks = [[2,2],[6,3],[5,4]]
Output: 2
Explanation: The diagram above shows the mountains.
- Mountain 0 is visible since its peak does not lie within another mountain or its sides.
- Mountain 1 is not visible since its peak lies within the side of mountain 2.
- Mountain 2 is visible since its peak does not lie within another mountain or its sides.
There are 2 mountains that are visible.

Input: peaks = [[1,3],[1,3]]
Output: 0
Explanation: The diagram above shows the mountains (they completely overlap).
Both mountains are not visible since their peaks lie within each other.

 */

const visibleMountains = (peaks) => {
  peaks.sort(
    (a, b) => a[0] - a[1] - (b[0] - b[1]) || -(a[0] + a[1]) + (b[0] + b[1])
  );

  let maxReach = -Infinity;
  let visible = 0;
  for (let i = 0; i < peaks.length; i++) {
    const [start, end] = peaks[i];
    if (start + end > maxReach) {
      maxReach = start + end;
      if (
        i + 1 < peaks.length &&
        peaks[i][0] === peaks[i + 1][0] &&
        peaks[i][1] === peaks[i + 1][1]
      )
        continue;
      visible++;
    }
  }
  return visible;
};
