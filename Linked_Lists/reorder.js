/**
 *You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 */
const reorderList = (head) => {
  // find the middle
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // reverse second half
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // do merge
  let left = head;
  let right = prev;

  while (right.next) {
    const nextLeft = left.next;
    const nextRight = right.next;
    // merge logic
    left.next = right;
    right.next = nextLeft;
    // update pointers
    left = nextLeft;
    right = nextRight;
  }

  return head;
};
