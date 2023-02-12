/*
Merge two sorted linked lists.
*/

// O(n) time | O(1) space
const mergeLists = (head1, head2) => {
  const dummyNode = new Node(null);
  let tail = dummyNode;
  let current1 = head1;
  let current2 = head2;

  while (current1 || current2) {
    const val1 = current1 ? current1.val : Infinity;
    const val2 = current2 ? current2.val : Infinity;
    if (val1 < val2) {
      tail.next = current1;
      current1 = current1.next;
    } else {
      tail.next = current2;
      current2 = current2.next;
    }
    tail = tail.next;
  }

  return dummyNode.next;
};
