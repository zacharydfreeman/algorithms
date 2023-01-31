/*
Merge two sorted linked list
*/

const mergeTwoLists = (list1, list2) => {
  // declare dummy node
  const dummyNode = new Node(null);
  let tail = dummyNode;
  let current1 = list1;
  let current2 = list2;

  while (current1 || current2) {
    const val1 = current1 ? current1.val : Infinity;
    const val2 = current2 ? current2.val : Infinity;
    if (val1 < val2) {
      tail.next = current1;
      current1 = current1.next;
      tail = tail.next;
    } else {
      tail.next = current2;
      current2 = current2.next;
      tail = tail.next;
    }
  }

  return dummyNode.next;
};
