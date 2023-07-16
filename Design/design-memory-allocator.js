/* 
You are given an integer n representing the size of a 0-indexed memory array. All memory units are initially free.

You have a memory allocator with the following functionalities:

Allocate a block of size consecutive free memory units and assign it the id mID.
Free all memory units with the given id mID.
Note that:

Multiple blocks can be allocated to the same mID.
You should free all the memory units with mID, even if they were allocated in different blocks.
Implement the Allocator class:

Allocator(int n) Initializes an Allocator object with a memory array of size n.
int allocate(int size, int mID) Find the leftmost block of size consecutive free memory units and allocate it with the id mID. Return the block's first index. If such a block does not exist, return -1.
int free(int mID) Free all memory units with the id mID. Return the number of memory units you have freed.



*/

class Allocator {
  constructor(n) {
    this.array = new Array(n).fill(null);
  }

  allocate(size, mID) {
    let count = 0;
    for (let i = 0; i < this.array.length; i++) {
      count = this.array[i] === null ? count + 1 : 0;
      if (count === size) {
        for (let j = 0; j < size; j++) {
          this.array[i - j] = mID;
        }
        return i - size + 1;
      }
    }
    return -1;
  }

  free(mID) {
    let count = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] === mID) {
        count++;
        this.array[i] = null;
      }
    }
    return count;
  }
}
