/*
Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest.
Sort the words with the same frequency by their lexicographical order.

Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.

Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
with the number of occurrence being 4, 3, 2 and 1 respectively.
*/

// Approach: "Naive" solution
// o(nlog(n)) time | O(n + k) space
const topKFrequent = (words, k) => {
  // create obj
  let hash = {};
  for (let word of words) {
    hash[word] = hash[word] + 1 || 1;
  }
  // comparator
  let result = Object.keys(hash).sort((a, b) => {
    let countCompare = hash[b] - hash[a];
    if (countCompare == 0) return a.localeCompare(b);
    else return countCompare;
  });
  return result.slice(0, k);
};

// Approach: Create a map with words and frequency and then create a min heap
// For the min heap constructor you have to build in functionality to handle if freq are the same
// if they are the same then you should modify based on string
const topKFrequent2 = (words, k) => {
  // create words map
  const wordsMap = {};
  for (let word of words) {
    if (!(word in wordsMap)) wordsMap[word] = 0;
    wordsMap[word]++;
  }

  // create heap
  // need to get words in map
  const wordKeys = Object.keys(wordsMap);
  const minHeap = [];
  for (let i = 0; i < k; i++) {
    const key = wordKeys[i];
    const freq = wordsMap[key];
    minHeap.push({ key, freq });
  }

  buildMinHeap(minHeap);

  // loop through rest of keys
  for (let i = k; i < wordKeys.length; i++) {
    const currentKey = wordKeys[i];
    const currentFreq = wordsMap[currentKey];
    const currentMinKey = minHeap[0].key;
    const currentMinFreq = minHeap[0].freq;
    // determine if you can add to heap
    // you only add if the frequency is bigger or if freq is same add is current key < minheap key
    if (currentFreq < currentMinFreq) continue;
    if (currentFreq > currentMinFreq) {
      remove(minHeap);
      insert({ key: currentKey, freq: currentFreq }, minHeap);
      continue;
    }
    // if you make it to this case then that means the frequencies are the same and you need to look at alphabetic order
    if (currentKey < currentMinKey) {
      remove(minHeap);
      insert({ key: currentKey, freq: currentFreq }, minHeap);
    }
  }

  // now we need to use a comparator function to sort the minheap
  minHeap.sort(function (a, b) {
    if (b.freq < a.freq) {
      return -1;
    } else if (b.freq === a.freq) {
      if (a.key < b.key) {
        return -1;
      }
    }
  });

  const output = [];
  for (let obj of minHeap) {
    output.push(obj.key);
  }

  return output;
};

const buildMinHeap = (minHeap) => {
  // get first parent index
  const firstParentIdx = Math.floor((minHeap.length - 2) / 2);
  // loop through parents and siftdown
  for (let startIdx = firstParentIdx; startIdx >= 0; startIdx--) {
    siftDown(startIdx, minHeap);
  }
};

const siftDown = (startIdx, minHeap) => {
  // get first child idx and declare start idx
  let currentIdx = startIdx;
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx < minHeap.length) {
    // check is child two exists
    let childTwoIdx = childOneIdx + 1 < minHeap.length ? childOneIdx + 1 : -1;
    // determine which index to swap. Must swap smaller value
    let idxToSwap;
    if (
      childTwoIdx !== -1 &&
      minHeap[childTwoIdx].freq < minHeap[childOneIdx].freq
    ) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    // determine if you actually make the swap
    if (minHeap[currentIdx].freq > minHeap[idxToSwap].freq) {
      // swap
      [minHeap[currentIdx], minHeap[idxToSwap]] = [
        minHeap[idxToSwap],
        minHeap[currentIdx],
      ];
      // update pointers
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
};

const siftUp = (startIdx, minHeap) => {
  // declare current and parent idx
  let currentIdx = startIdx;
  let parentIdx = Math.floor((currentIdx - 1) / 2);
  while (parentIdx >= 0) {
    // if parent value is greater, you need to swap
    if (minHeap[parentIdx].freq > minHeap[currentIdx].freq) {
      // swap
      [minHeap[parentIdx], minHeap[currentIdx]] = [
        minHeap[currentIdx],
        minHeap[parentIdx],
      ];
      // update pointers
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    } else {
      return;
    }
  }
};

const insert = (obj, minHeap) => {
  // add to end of array
  minHeap.push(obj);
  // sift up
  siftUp(minHeap.length - 1, minHeap);
};

const remove = (minHeap) => {
  // swap first with last element
  [minHeap[0], minHeap[minHeap.length - 1]] = [
    minHeap[minHeap.length - 1],
    minHeap[0],
  ];
  // pop from end
  minHeap.pop();
  // sift down
  siftDown(0, minHeap);
};

const words = [
  "i",
  "love",
  "leetcode",
  "i",
  "love",
  "coding",
  "i",
  "i",
  "zack",
  "zack",
  "zack",
  "love",
];
const k = 3;
console.log(topKFrequent2(words, k));
