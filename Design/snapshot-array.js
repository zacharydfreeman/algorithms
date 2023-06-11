/* 
Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id

Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5

*/

class SnapshotArray {
  constructor(length) {
    this.snapshot = new Array(length).fill().map(() => []);
    this.currentSnap = 0;
    for (let i = 0; i < this.snapshot.length; i++) {
      this.snapshot[i].push([this.currentSnap, 0]);
    }
  }

  set(index, val) {
    this.snapshot[index].push([this.currentSnap, val]);
  }

  snap() {
    return this.currentSnap++;
  }

  get(index, snap_shot) {
    let l = 0;
    let r = this.snapshot[index].length - 1;
    let res = null;

    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const [midSnap, midVal] = this.snapshot[index][mid];
      if (snap_shot >= midSnap) {
        res = midVal;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return res;
  }
}

class SnapshotArray2 {
  constructor(length) {
    this.array = new Array(length).fill(0);
    this.snaps = { 0: this.array };
    this.currentSnap = 0;
  }

  set(index, val) {
    // for the current snapshot, update the value
    this.snaps[this.currentSnap][index] = val;
  }

  snap() {
    this.array = [...this.array];
    this.currentSnap++;
    this.snaps[this.currentSnap] = this.array;
    return this.currentSnap - 1;
  }

  get(index, snap_id) {
    return this.snaps[snap_id][index];
  }
}
