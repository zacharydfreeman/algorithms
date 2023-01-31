/*
Implement a doubly linked list class
*/

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(1) time | O(1) space
  setHead(node) {
    // if there is no head set the head and tail to the node
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    }
    // use insertBefore method
    this.insertBefore(this.head, node);
  }

  // O(1) time | O(1) space
  setTail(node) {
    // same logic as setHead
    if (this.tail === null) {
      this.setHead(node);
    }
    this.insertAfter(this.tail, node);
  }

  // O(1) time | O(1) space
  insertBefore(node, nodeToInsert) {
    // Check to make sure node to insert is not the head and tail of list becuase nothing would happen
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    // remove the node
    this.remove(nodeToInsert);
    // grab necessary pointers and udpate
    const prev = node.prev;
    // update the node
    node.prev = nodeToInsert;
    nodeToInsert.next = node;
    // check if prev is null becuase it may be the new head
    if (prev !== null) {
      prev.next = nodeToInsert;
      nodeToInsert.prev = prev;
    } else {
      this.head = nodeToInsert;
    }
  }

  // O(1) time | O(1) space
  insertAfter(node, nodeToInsert) {
    // Check to make sure node to insert is not the head and tail of list becuase nothing would happen
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    // remove the node
    this.remove(nodeToInsert);
    // grab necessary pointers and udpate
    const next = node.next;
    // update the node
    node.next = nodeToInsert;
    nodeToInsert.prev = node;
    // check if next is null becuase it may be the new tail
    if (next !== null) {
      next.prev = nodeToInsert;
      nodeToInsert.next = next;
    } else {
      this.tail = nodeToInsert;
    }
  }

  // O(n) time | O(1) space. Really O(p) where p is the position
  insertAtPosition(position, nodeToInsert) {
    // If positions is 1, then set head
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }
    let current = this.head;
    let currentPosition = 1;
    // find the node at the current position
    while (current !== null && currentPosition !== position) {
      current = current.next;
      currentPosition++;
    }
    // if node is not null, insert node before the current otherwise set the tail to node
    if (current !== null) {
      this.insertBefore(current, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  // O(n) time | O(1) space
  removeNodesWithValue(value) {
    let current = this.head;
    // traverse list and find all instances of value and remove
    while (current !== null) {
      // grab next node
      const next = current.next;
      if (current.value === value) this.remove(current);
      current = next;
    }
  }

  // O(1) time | O(1) space
  remove(node) {
    // check to see if you are dealing with the head or tail
    if (node === this.head) this.head = this.head.next;
    if (node === this.tail) this.tail = this.tail.prev;

    // remove pointers of current Node and update pointers of surrounding nodes
    this.removeNodeBindings(node);
  }

  // O(1) time | O(1) space
  removeNodeBindings(node) {
    // grab prev and next values before updating
    const prev = node.prev;
    const next = node.next;
    // update prev and next if they are not null
    if (node.prev !== null) node.prev.next = next;
    if (node.next !== null) node.next.prev = prev;
    // set prev and next pointer to null
    node.prev = null;
    node.next = null;
  }

  // O(n) time | O(1) space
  containsNodeWithValue(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
}
