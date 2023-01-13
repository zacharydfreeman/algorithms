/*
Write a function, sumList, that takes in the head of a linked list containing numbers as an argument.
The function should return the total sum of all values in the linked list.

const a = new Node(2);
const b = new Node(8);
const c = new Node(3);
const d = new Node(-1);
const e = new Node(7);

a.next = b;
b.next = c;
c.next = d;
d.next = e;

// 2 -> 8 -> 3 -> -1 -> 7 -> null
(head)                  (tail)
sumList(a); // 19
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
}
