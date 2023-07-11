/* 
You are given the head of a linked list containing unique integer values and an integer array nums that is a subset of the linked list values.

Return the number of connected components in nums where two values are connected if they appear consecutively in the linked list.

Input: head = [0,1,2,3], nums = [0,1,3]
Output: 2
Explanation: 0 and 1 are connected, so [0, 1] and [3] are the two connected components.

Input: head = [0,1,2,3,4], nums = [0,3,1,4]
Output: 2
Explanation: 0 and 1 are connected, 3 and 4 are connected, so [0, 1] and [3, 4] are the two connected components.

*/

// O(n) time | O(1) space
const numComponents = (head, nums) => {
  // declare map
  const map = {};
  let current = head;
  while (current) {
    map[current.val] = current.next ? current.next.val : null;
    current = current.next;
  }
  const visited = new Set();
  const numsSet = new Set([...nums]);
  let count = 0;
  for (let num of nums) {
    if (visited.has(num)) continue;
    visited.add(num);
    let next = map[num];
    let newComponent = true;
    while (numsSet.has(next)) {
      if (visited.has(next)) newComponent = false;
      visited.add(next);
      next = map[next];
    }
    if (newComponent) count++;
  }
  return count;
};
