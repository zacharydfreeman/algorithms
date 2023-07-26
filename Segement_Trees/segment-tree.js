class Node {
  constructor(sum, l, r) {
    this.sum = sum;
    this.leftIdx = l;
    this.rightIdx = r;
    this.left = null;
    this.right = null;
  }
}

class SegmentTree {
  constructor(array) {
    this.segmentTree = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, l, r) {
    // base case if l equals r which denotes a length of 1
    if (l === r) return new Node(array[l], l, r);
    // get mid point
    const midIdx = Math.floor((l + r) / 2);
    // create root node with an initial sum of 0
    const root = new Node(0, l, r);
    // assign root.left to recursively calling buildTree on left half of array
    root.left = this.buildTree(array, l, midIdx);
    // assign root.right to recursively calling buildTree on right half of array
    root.right = this.buildTree(array, midIdx + 1, r);
    // update sum of root
    root.sum = root.left.sum + root.right.sum;
    return root;
  }

  update(index, val, current = this.segmentTree) {
    // base case if current left and right indices are equal, update sum
    if (current.leftIdx === current.rightIdx) {
      current.sum = val;
      return;
    }
    // calculate mid point
    const midIdx = Math.floor((current.leftIdx + current.rightIdx) / 2);
    // index > midIdx, explore right subtree. Otherwise, explore left subtree
    if (index > midIdx) {
      this.update(index, val, current.right);
    } else {
      this.update(index, val, current.left);
    }
    // update the currentNode's sum
    current.sum = current.left.sum + current.right.sum;
  }

  rangeQuery(leftIndex, rightIndex, current = this.segmentTree) {
    // base case if current leftIdx = leftIndex && current rightIdx = rightIndex
    if (current.leftIdx === leftIndex && current.rightIdx === rightIndex)
      return current.sum;
    // calculate mid point
    const midIdx = Math.floor((current.leftIdx + current.rightIdx) / 2);
    // if leftIndex > midIdx, the entire range is in the right subtree
    if (leftIndex > midIdx) {
      return this.rangeQuery(leftIndex, rightIndex, current.right);
    } else if (rightIndex <= midIdx) {
      // if right index <= midIdx, the entire range is in left subtree
      return this.rangeQuery(leftIndex, rightIndex, current.left);
    } else {
      // otherwise the range spans both subtrees
      return (
        this.rangeQuery(leftIndex, midIdx, current.left) +
        this.rangeQuery(midIdx + 1, rightIndex, current.right)
      );
    }
  }
}
