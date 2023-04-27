/**
 *
 */

// O(n) time | O(1) space
const minimumBribes = (q) => {
  // declare bribes variable
  let bribes = 0;
  // loop starting from back
  for (let i = q.length - 1; i >= 0; i--) {
    // check to see if current num is equal to index + 1
    if (q[i] !== i + 1) {
      // check to the element one place to left to see if is the correct number
      if (q[i - 1] === i + 1) {
        // add one to bribe and swap elements
        bribes++;
        [q[i - 1], q[i]] = [q[i], q[i + 1]];
      } else if (q[i - 2] === i + 1) {
        // add two to bribe and swap the three elements
        bribes += 2;
        [q[i - 2], q[i - 1], q[i]] = [q[i - 1], q[i], q[i + 2]];
      } else {
        console.log('Too chaotic');
        return;
      }
    }
  }
  console.log(bribes);
};
