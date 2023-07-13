/* 
Given two vectors of integers v1 and v2, implement an iterator to return their elements alternately.

Implement the ZigzagIterator class:

ZigzagIterator(List<int> v1, List<int> v2) initializes the object with the two vectors v1 and v2.
boolean hasNext() returns true if the iterator still has elements, and false otherwise.
int next() returns the current element of the iterator and moves the iterator to the next element.

*/

class ZigzagIterator {
  constructor(v1, v2) {
    this.v1 = v1;
    this.v2 = v2;
    this.idxOne = 0;
    this.idxTwo = 0;
    this.called = 0;
  }

  hasNext() {
    return this.idxOne < this.v1.length || this.idxTwo < this.v2.length;
  }

  next() {
    if (this.called % 2 === 0) {
      this.called++;
      if (this.idxOne < this.v1.length) {
        return this.v1[this.idxOne++];
      } else {
        return this.v2[this.idxTwo++];
      }
    } else {
      this.called++;
      if (this.idxTwo < this.v2.length) {
        return this.v2[this.idxTwo++];
      } else {
        return this.v1[this.idxOne++];
      }
    }
  }
}
