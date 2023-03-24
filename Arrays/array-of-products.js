/* 
Write a function that takes in a non-empty array of integers and returns an array of the same length, where each element in the output array is equal to the product of every other number in the input array

array = [5, 1, 4, 2]
output = [8, 40, 10, 20]
*/

// O(n) time | O(n) space
const arrayOfProducts = (array) => {
  // declare products array and fill with 1
  const products = new Array(array.length).fill(1);
  // calculate left running product
  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    products[i] *= leftRunningProduct;
    leftRunningProduct *= array[i];
  }
  // calculate right running product
  let rightRunningProduct = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    products[i] *= rightRunningProduct;
    rightRunningProduct *= array[i];
  }
  return products;
};

// O(n) time | O(n) space
const arrayOfProducts2 = (array) => {
  const leftProducts = new Array(array.length).fill(1);
  const rightProducts = new Array(array.length).fill(1);
  for (let i = 1; i < leftProducts.length; i++) {
    leftProducts[i] = array[i - 1] * leftProducts[i - 1];
  }
  for (let i = array.length - 2; i >= 0; i--) {
    rightProducts[i] = array[i + 1] * rightProducts[i + 1];
  }
  const output = [];
  for (let i = 0; i < array.length; i++) {
    output[i] = leftProducts[i] * rightProducts[i];
  }
  return output;
};

console.log(arrayOfProducts([5, 1, 4, 2]));
