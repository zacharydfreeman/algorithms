/**
You're developing a system for scheduling advising meetings with students in a Computer Science program.
Each meeting should be scheduled when a student has completed 50% of their academic program.

Each course at our university has at most one prerequisite that must be taken first.
No two courses share a prerequisite. There is only one path through the program.

Write a function that takes a list of (prerequisite, course) pairs, and returns the name of the
course that the student will be taking when they are halfway through their program.
(If a track has an even number of courses, and therefore has two "middle" courses, you should return the first one.)

Sample input 1: (arbitrarily ordered)
pairs1 = [
	["Foundations of Computer Science", "Operating Systems"],
	["Data Structures", "Algorithms"],
	["Computer Networks", "Computer Architecture"],
	["Algorithms", "Foundations of Computer Science"],
	["Computer Architecture", "Data Structures"],
	["Software Design", "Computer Networks"]
]

In this case, the order of the courses in the program is:
	Software Design
	Computer Networks
	Computer Architecture
	Data Structures
	Algorithms
	Foundations of Computer Science
	Operating Systems

Sample output 1:
	"Data Structures"

Sample input 2:
pairs2 = [
    ["Algorithms", "Foundations of Computer Science"],
    ["Data Structures", "Algorithms"],
    ["Foundations of Computer Science", "Logic"],
    ["Logic", "Compilers"],
    ["Compilers", "Distributed Systems"],
]

Sample output 2:
	"Foundations of Computer Science"

Sample input 3:
pairs3 = [
	["Data Structures", "Algorithms"],
]

Sample output 3:
	"Data Structures"

All Test Cases:
halfway_course(pairs1) => "Data Structures"
halfway_course(pairs2) => "Foundations of Computer Science"
halfway_course(pairs3) => "Data Structures"

 */

// Approach: you can think of this problem as a linked list given the constraints
// sd -> cn -> ca -> d -> a -> f -> o. We can create a graph that essentially will represent the linked list

const halfway_course = (pairs) => {
	// create graph that will be {prereq: [course]} in order to determine which class to start with
	const graph = {};
	for (let pair of pairs) {
		const preReq = pair[0];
		const course = pair[1];
		if (!(course in graph)) graph[course] = [];
		if (!(preReq in graph)) graph[preReq] = [];
		graph[course].push(preReq);
	}

	// find the start class which is the class that has no preReqs
	let start;
	for (let course in graph) {
		if (graph[course].length === 0) {
			start = course;
			break;
		}
	}
	// create a graph that you can traverse
	const traverseGraph = {};
	for (let pair of pairs) {
		const preReq = pair[0];
		const course = pair[1];
		if (!(course in traverseGraph)) traverseGraph[course] = [];
		if (!(preReq in traverseGraph)) traverseGraph[preReq] = [];
		traverseGraph[preReq].push(course);
	}

	// traverse the graph until halfway point
	let current = start;
	// calculate appropriate halfway point
	let halfwayPoint = Math.floor((Object.keys(graph).length - 1) / 2);
	let count = 0;
	while (true) {
		if (count === halfwayPoint) return current;
		count++;
		current = traverseGraph[current][0];
	}
}

const pairs2 = [
    ["Algorithms", "Foundations of Computer Science"],
    ["Data Structures", "Algorithms"],
    ["Foundations of Computer Science", "Logic"],
    ["Logic", "Compilers"],
    ["Compilers", "Distributed Systems"],
];

const pairs1 = [
	["Foundations of Computer Science", "Operating Systems"],
	["Data Structures", "Algorithms"],
	["Computer Networks", "Computer Architecture"],
	["Algorithms", "Foundations of Computer Science"],
	["Computer Architecture", "Data Structures"],
	["Software Design", "Computer Networks"]
]

const pairs3 = [
	["Data Structures", "Algorithms"],
]


console.log(halfway_course(pairs1))// => "Data Structures"
console.log(halfway_course(pairs2))// => "Foundations of Computer Science"
console.log(halfway_course(pairs3))// => "Data Structures"
