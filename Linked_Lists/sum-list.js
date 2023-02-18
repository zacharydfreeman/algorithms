/*
Write a function, sumList, that takes in the head of a linked list containing numbers as an argument.
The function should return the total sum of all values in the linked list.

*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space
const sumList = (head) => {
  // declare total and current node variable
  let current = head;
  let total = 0;
  // traverse list
  while (current) {
    total += current.value;
    current = current.next;
  }
  return total;
};
