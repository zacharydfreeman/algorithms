/*
/*
You need to put a book at a particular location, indicated by an index, on a bookcase. Each book has a width, and a single shelf of the bookcase can only hold a total width of 20. When adding a new book, all books, if any, at that index and after it have to shift to the right on the shelf. If the new arrangement of the books doesn't fit on the shelf, you need to move books from the right to the lower shelf so that the new book will fit in this shelf.

Write a function that, given a bookcase, the width of the book to insert, and the index where the book is to be inserted, determines the number of books that must be moved to fit the new book. If the book cannot be made to fit, return -1.

For example, say that we are given the following input:

bookcase1 = [
  [2, 2, 3, 5, 3, 1, 3],   (total width 19)
  [1, 5, 5, 5, 1, 1, 1],   (total width 19)
  [3, 3, 3, 1, 1, 1],      (total width 12)
]
width = 2
index = 2

This represents a bookcase like this (each book is represented by a letter):

Shelf 0 |AABBCCCDDDDDEEEFGGG | (width 19/20)
Shelf 1 |HIIIIIJJJJJKKKKKLMN | (width 19/20)
Shelf 2 |OOOPPPQQQRST        | (width 12/20)

We want to insert book "XX" of width 2 at index 2, before CCC (book indices start from 0 and wrap to the next shelf when you reach the end of a shelf). However, if we do so, the books on shelf 0 will overflow.

Shelf 0 |AABBXXCCCDDDDDEEEFGGG (width 21/20)

To fix this, we need to move a book from shelf 0 to shelf 1. However, the books must stay in order, so we must move book GGG first. This causes shelf 1 to overflow.

Shelf 0 |AABBXXCCCDDDDDEEEF  |  (width 18/20)
Shelf 1 |GGGHIIIIIJJJJJKKKKKLMN (width 22/20)

Consequently, we then need to move books M and N to shelf 2.

Shelf 0 |AABBXXCCCDDDDDEEEF  |  (width 18/20)
Shelf 1 |GGGHIIIIIJJJJJKKKKKL|  (width 20/20)
Shelf 2 |MNOOOPPPQQQRST      |  (width 14/20)

We moved a total of 3 books (GGG, M, N), so your function would return 3.

insert(bookcase1, width, index) => 3


All test cases:
bookcase1 = [
  [2, 2, 3, 5, 3, 1, 3],   (total width 19)
  [1, 5, 5, 5, 1, 1, 1],   (total width 19)
  [3, 3, 3, 1, 1, 1],      (total width 12)
]

bookcase2 = [
  [1, 4, 3, 2, 3],     (total width 13)
  [5, 3, 1, 2],        (total width 11)
  [4],                 (total width 4)
  [3, 3, 1, 2, 3, 5],  (total width 17)
  [],                  (total width 0)
  [5, 3, 1, 3],        (total width 12)
]

bookcase3 = [
  [10, 5, 1, 4],  (total width 20)
  [9, 5, 5, 1],   (total width 20)
  [10, 4, 1, 1],  (total width 16)
  [1, 2, 3]       (total width 6)
]

insert(bookcase1, 2, 2)   => 3   => Move 1 book at the end of the first shelf, and 2 at the end of the second
insert(bookcase1, 4, 11)  => 3   => Move 3 books at the end of the second shelf
insert(bookcase1, 1, 0)   => 0   => Book fits without moving any other books
insert(bookcase1, 2, 9)   => 1   => Move 1 book at the end of the second shelf
insert(bookcase1, 10, 9)  => -1  => Even by moving all books on the second shelf, the last shelf would go over 20
insert(bookcase1, 5, 11)  => -1  => Even by moving all books on the second shelf, it still doesn't fit
insert(bookcase1, 3, 13)  => -1  => Even by moving the book at the end of the second shelf, the book still doesn't fit
insert(bookcase2, 4, 15)  => 1   => Move 1 book at the end of the fourth shelf
insert(bookcase2, 4, 16)  => 0   => Book fits without moving any other books
insert(bookcase3, 4, 3)   => 5   => Move 1 book at the end of the first shelf, 2 at the end of the second, and 2 at the end of the third

Complexity analysis variables:
S: the number of shelves in the bookcase

bookcase1 = [
  [2, 2, 2, 3, 5, 3, 1],   (total width 19) 18
  [3, 1, 5, 5, 5, 1],   (total width 19) 22
  [1, 1, 3, 3, 3, 1, 1, 1],      (total width 12) 14
]
[1, 1]

width = 2
index = 2

 */
