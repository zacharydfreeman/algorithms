/*
You are with your friends in a castle, where there are multiple rooms named after flowers.
Some of the rooms contain treasures - we call them the treasure rooms.

Each room contains a single instruction that tells the player which room to go to next.

 *** instructions_1 ***
 lily --------      daisy  sunflower
               |       |     |
               v       v     v
 jasmin ->  tulip      violet    -> rose --->
            ^    |      ^             ^     |
            |    |      |             |     |
            -----     iris             -----

 *** instructions_2 ***
 lily --------
               |
               v
 jasmin ->  tulip -- > violet

Write a function that takes two parameters as input:
* a list containing the treasure rooms, and
* a list of instructions represented as pairs of (source_room, destination_room)

and returns a collection of all the rooms that satisfy the following two conditions:

* at least two *other* rooms have instructions pointing to this room
* this room's instruction immediately leads to a treasure room

Examples

instructions_1 = [
    ["jasmin", "tulip"],
    ["lily", "tulip"],
    ["tulip", "tulip"],
    ["rose", "rose"],
    ["violet", "rose"],
    ["sunflower", "violet"],
    ["daisy", "violet"],
    ["iris", "violet"]

]

treasure_rooms_1 = ["lily", "tulip", "violet", "rose"]
treasure_rooms_2 = ["lily", "jasmin", "violet"]

instructions_2 = [
    ["jasmin", "tulip"],
    ["lily", "tulip"],
    ["tulip", "violet"],
    ["violet", "violet"]
]
treasure_rooms_3 = ["violet"]


filter_rooms(treasure_rooms_1, instructions_1) => ["tulip", "violet"]
* tulip can be accessed from rooms lily and jasmin. Tulip's instruction leads to a treasure room (tulip itself)
* violet can be accessed from daisy, sunflower and iris. Violet's instruction leads to a treasure room (rose)

filter_rooms(treasure_rooms_2, instructions_1) => []
* none of the rooms reachable from tulip or violet are treasure rooms

filter_rooms(treasure_rooms_3, instructions_2) => [tulip]
* tulip can be accessed from rooms lily and jasmin. Tulip's instruction leads to a treasure room (violet)

All the test cases:
filter_rooms(treasure_rooms_1, instructions_1)    => ["tulip", "violet"]
filter_rooms(treasure_rooms_2, instructions_1)    => []
filter_rooms(treasure_rooms_3, instructions_2)    => [tulip]

*/

// O(n + m) time | O(n + m) space where n is length of instructions and m is length of treasure rooms
const filterRooms = (instructions, treasureRooms) => {
  // create object => {room: [array of rooms that point to this room]}
  const roomsObject = createRoomsObject(instructions);
  // create set of treasure rooms
  const treasureRoomsSet = new Set(treasureRooms);
  // set that will hold the rooms that have multiple rooms leading to it
  const roomsWithMultipleSources = new Set();
  const rooms = [];
  // loop through obj and put into roomsWithMultipleSources if obj[room].lenght > 1
  for (let room in roomsObject) {
    if (roomsObject[room].length > 1) roomsWithMultipleSources.add(room);
  }
  // loop through instructions and see if room1 is in multiple sources and then check if rooms lead to a treasure room
  for (let instruction of instructions) {
    const [room1, room2] = instruction;
    if (roomsWithMultipleSources.has(room1) && treasureRoomsSet.has(room2)) {
      rooms.push(room1);
    }
  }

  return rooms;
};

const createRoomsObject = (instructions) => {
  const roomsObject = {};
  for (let instruction of instructions) {
    const [room1, room2] = instruction;
    if (room1 === room2) continue;
    if (!(room2 in roomsObject)) roomsObject[room2] = [];
    roomsObject[room2].push(room1);
  }
  return roomsObject;
};
