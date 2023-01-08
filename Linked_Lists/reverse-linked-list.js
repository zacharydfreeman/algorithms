/*
Write a function that takes in a the head of a Singly Linked List, reverses the list in place (doesnt create a new one)

Each Linkedlist node has an integer value as well as a next node pointing to the next node in the list
or to null if it is the tail of the list

You can assum that the input Linked List will always have at least one nodel in other words, the head never be null

Input: head = 0 -> 1 -> 2-> 3 -> 4 -> 5
Output: 5 -> 4 -> 3 -> 2 -> 1 -> 0
*/

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Iteratively
// O(n) time | O(1) space
const reverseLinkedList1 = (head) => {
    // declare two points. One to keep track of the previous Node and one for the current Node
    let prev = null;
    let current = head;
    while (current) {
        // grab current.next so its not overridden
        const next = current.next;
        current.next = prev; // point current to prev
        // update pointers
        prev = current;
        current = next;
    }
    // return the new head
    return prev;
}

// Recursively
// O(n) time | O(n) space
const reverseLinkedList2 = (head, prev = null) => {
    // base case
    if (head === null) return prev;
    // grab head's next pointer
    const next = head.next;
    // update heads pointer to point to prev
    head.next = prev;
    // return recurisve call with next as head and head as prev
    return reverseLinkedList2(next, head);
}
