/*
We are working for a train company writing an application to find the best empty seats in train cars.
We are looking for the best empty seats, these are the ones that are surrounded by other empty seats (front, side, and back).
Each car has a total of 10 seats, distributed in five rows, labeled A - E. Moreover, rows are divided into two columns, labeled 1 or 2.

Car:     001               027               457
Side:  1     2           1     2           1     2
     -----------       -----------       -----------
   A |[X]   [X]|     A |[X]   [X]|     A |[_]* *[_]|
   B |[X]   [X]|     B |[X]   [X]|     B |[_]   [_]|
   C |[_]   [_]|     C |[X]   [X]|     C |[X]   [X]| <-- Seat 457-C-2
   D |[_]* *[_]|     D |[X]   [X]|     D |[_]   [_]|
   E |[_]* *[_]|     E |[_]   [_]|     E |[_]* *[_]|
     -----------       -----------       -----------
[X]  is a booked seat
[_]  is an empty seat
[_]* is an empty seat that is one of the best

Each ticket contains the number of a car (three digits), followed by a letter identifying the row, followed by the column's number:

       001-A-1           027-A-1           457-C-1
       001-A-2           027-A-2           457-C-2
       001-B-1           027-B-1
       001-B-2           027-B-2
                         027-C-1
                         027-C-2
                         027-D-1
                         027-D-2


Given a collection of sold tickets, write a function that returns the number of best empty seats left in cars.

Examples:
tickets_1 = ['457-C-1', '027-C-1', '027-C-2', '001-A-1', '001-A-2', '001-B-1', '001-B-2', '027-A-1', '027-A-2', '027-B-1', '027-B-2', '027-D-1', '027-D-2', '457-C-2']

tickets_2 = ['001-A-1', '001-A-2', '001-B-1', '001-B-2', '001-C-1', '001-C-2', '001-D-1', '001-D-2', '001-E-1', '001-E-2']
tickets_3 = ['001-A-1', '001-A-2', '001-B-1', '027-A-1', '027-A-2', '027-B-1', '027-B-2', '027-C-1', '027-C-2', '027-D-1']
tickets_4 = ['001-A-1', '001-B-2', '001-C-1', '001-D-2', '001-E-1']
tickets_5 = []
tickets_6 = ['666-A-1', '666-B-1', '666-C-1', '666-D-1', '666-E-1', '999-A-1', '999-E-2']
tickets_7 = ['001-A-1', '002-B-2', '003-C-1', '100-C-2', '123-D-1', '555-D-2', '888-E-1']

best_seats(tickets_1) -> 8
best_seats(tickets_2) -> 0
best_seats(tickets_3) -> 6
best_seats(tickets_4) -> 0
best_seats(tickets_5) -> 0
best_seats(tickets_6) -> 4
best_seats(tickets_7) -> 44


Complexity variables:
T - number of tickets

*/

const best_seats = (tickets) => {
  const map = getMap(tickets);
  let count = 0;
  for (let car in map) {
    const allSeats = map[car];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 2; col++) {
        // if seat is filled, continue
        if (allSeats[row][col] === 1) continue;
        // check for out of bounds later
        const aboveValid = row === 0 || !allSeats[row - 1][col] ? true : false;
        const belowValid = row === 4 || !allSeats[row + 1][col] ? true : false;
        const leftValid = col === 0 || !allSeats[row][col - 1] ? true : false;
        const rightValid = col === 1 || !allSeats[row][col + 1] ? true : false;
        if (aboveValid && belowValid && leftValid && rightValid) {
          count++;
        }
      }
    }
  }
  return count;
};

const getMap = (tickets) => {
  const keys = { A: 0, B: 1, C: 2, D: 3, E: 4 };
  const map = {};
  for (let ticket of tickets) {
    // "457-C-1"
    const car = ticket.slice(0, 3);
    if (!(car in map)) {
      const positions = [];
      for (let row = 0; row < 5; row++) {
        const newRow = [];
        for (let col = 0; col < 2; col++) {
          newRow.push(0);
        }
        positions.push(newRow);
      }
      map[car] = positions;
    }

    //get row
    const letter = ticket.slice(4, 5);
    const col = ticket.slice(6);
    const row = keys[letter];
    map[car][row][col - 1] = 1;
  }
  return map;
};

const tickets_1 = [
  "457-C-1",
  "027-C-1",
  "027-C-2",
  "001-A-1",
  "001-A-2",
  "001-B-1",
  "001-B-2",
  "027-A-1",
  "027-A-2",
  "027-B-1",
  "027-B-2",
  "027-D-1",
  "027-D-2",
  "457-C-2",
];
const tickets_2 = [
  "001-A-1",
  "001-A-2",
  "001-B-1",
  "001-B-2",
  "001-C-1",
  "001-C-2",
  "001-D-1",
  "001-D-2",
  "001-E-1",
  "001-E-2",
];
const tickets_3 = [
  "001-A-1",
  "001-A-2",
  "001-B-1",
  "027-A-1",
  "027-A-2",
  "027-B-1",
  "027-B-2",
  "027-C-1",
  "027-C-2",
  "027-D-1",
];
const tickets_4 = ["001-A-1", "001-B-2", "001-C-1", "001-D-2", "001-E-1"];
const tickets_5 = [];
const tickets_6 = [
  "666-A-1",
  "666-B-1",
  "666-C-1",
  "666-D-1",
  "666-E-1",
  "999-A-1",
  "999-E-2",
];
const tickets_7 = [
  "001-A-1",
  "002-B-2",
  "003-C-1",
  "100-C-2",
  "123-D-1",
  "555-D-2",
  "888-E-1",
];

console.log(best_seats(tickets_1));
console.log(best_seats(tickets_2));
console.log(best_seats(tickets_3));
console.log(best_seats(tickets_4));
console.log(best_seats(tickets_5));
console.log(best_seats(tickets_6));
console.log(best_seats(tickets_7));
