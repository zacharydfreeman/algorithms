/*
We have a catalog of song titles (and their lengths) that we play at a local radio station.  We have been asked to play two of those songs in a row, and they must add up to exactly seven minutes long.

Given a list of songs and their durations, write a function that returns the names of any two distinct songs that add up to exactly seven minutes.  If there is no such pair, return an empty collection.

Example:
song_times_1 = [
    ("Stairway to Heaven", "8:05"), ("Immigrant Song", "2:27"),
    ("Rock and Roll", "3:41"), ("Communication Breakdown", "2:29"),
    ("Good Times Bad Times", "2:48"), ("Hot Dog", "3:19"),
    ("The Crunge", "3:18"), ("Achilles Last Stand", "10:26"),
    ("Black Dog", "4:55")
]
find_pair(song_times_1) => ["Rock and Roll", "Hot Dog"] (3:41 + 3:19 = 7:00)

Additional Input:
song_times_2 = [
    ("Stairway to Heaven", "8:05"), ("Immigrant Song", "2:27"),
    ("Rock and Roll", "3:41"), ("Communication Breakdown", "2:29"),
    ("Good Times Bad Times", "2:48"), ("Black Dog", "4:55"),
    ("The Crunge", "3:18"), ("Achilles Last Stand", "10:26"),
    ("The Ocean", "4:31"), ("Hot Dog", "3:19"),
]
song_times_3 = [
    ("Stairway to Heaven", "8:05"), ("Immigrant Song", "2:27"),
    ("Rock and Roll", "3:41"), ("Communication Breakdown", "2:29"),
    ("Hey Hey What Can I Do", "4:00"), ("Poor Tom", "3:00"),
    ("Black Dog", "4:55")
]
song_times_4 = [
    ("Hey Hey What Can I Do", "4:00"), ("Rock and Roll", "3:41"),
    ("Communication Breakdown", "2:29"), ("Going to California", "3:30"),
    ("Black Mountain Side", "2:00"), ("Black Dog", "4:55")
]
song_times_5 = [("Celebration Day", "3:30"), ("Going to California", "3:30")]


Complexity Variable:
n = number of song/time pairs

All Test Cases - snake_case:
find_pair(song_times_1) => ["Rock and Roll", "Hot Dog"]
find_pair(song_times_2) => ["Rock and Roll", "Hot Dog"] or ["Communication Breakdown", "The Ocean"]
find_pair(song_times_3) => ["Hey Hey What Can I Do", "Poor Tom"]
find_pair(song_times_4) => []
find_pair(song_times_5) => ["Celebration Day", "Going to California"]

All Test Cases - camelCase:
findPair(songTimes1) => ["Rock and Roll", "Hot Dog"]
findPair(songTimes2) => ["Rock and Roll", "Hot Dog"] or ["Communication Breakdown", "The Ocean"]
findPair(songTimes3) => ["Hey Hey What Can I Do", "Poor Tom"]
findPair(songTimes4) => []
findPair(songTimes5) => ["Celebration Day", "Going to California"]


*/

// O(n) time | O(n) space
const findPair = (songTimes) => {
  const songs = {};
  for (let songTime of songTimes) {
    const [songTitle, songDuration] = songTime;
    const duration = convert(songDuration);
    if (!(duration in songs)) songs[duration] = [];
    songs[duration].push(songTitle);
  }
  const output = [];
  for (let duration in songs) {
    const complement = 7 - Number(duration);
    const currentSongs = songs[duration];
    for (let currentSong of currentSongs) {
      if (complement in songs) {
        const secondSongs = songs[complement];
        for (let secondSong of secondSongs) {
          if (currentSong === secondSong) continue;
          output.push(currentSong, secondSong);
          return output;
        }
      }
    }
  }
  return output;
};

const convert = (songDuration) => {
  const numbers = songDuration.split(':');
  const minutes = parseInt(numbers[0]);
  const seconds = parseInt(numbers[1]) / 60;
  return minutes + seconds;
};

const songTimes1 = [
  ['Stairway to Heaven', '8:05'],
  ['Immigrant Song', '2:27'],
  ['Rock and Roll', '3:41'],
  ['Communication Breakdown', '2:29'],
  ['Good Times Bad Times', '2:48'],
  ['Hot Dog', '3:19'],
  ['The Crunge', '3:18'],
  ['Achilles Last Stand', '10:26'],
  ['Black Dog', '4:55'],
];
const songTimes2 = [
  ['Stairway to Heaven', '8:05'],
  ['Immigrant Song', '2:27'],
  ['Rock and Roll', '3:41'],
  ['Communication Breakdown', '2:29'],
  ['Good Times Bad Times', '2:48'],
  ['Black Dog', '4:55'],
  ['The Crunge', '3:18'],
  ['Achilles Last Stand', '10:26'],
  ['The Ocean', '4:31'],
  ['Hot Dog', '3:19'],
];
const songTimes3 = [
  ['Stairway to Heaven', '8:05'],
  ['Immigrant Song', '2:27'],
  ['Rock and Roll', '3:41'],
  ['Communication Breakdown', '2:29'],
  ['Hey Hey What Can I Do', '4:00'],
  ['Poor Tom', '3:00'],
  ['Black Dog', '4:55'],
];
const songTimes4 = [
  ['Hey Hey What Can I Do', '4:00'],
  ['Rock and Roll', '3:41'],
  ['Communication Breakdown', '2:29'],
  ['Going to California', '3:30'],
  ['Black Mountain Side', '2:00'],
  ['Black Dog', '4:55'],
];
const songTimes5 = [
  ['Celebration Day', '3:30'],
  ['Going to California', '3:30'],
];

console.log(findPair(songTimes1));
console.log(findPair(songTimes2));
console.log(findPair(songTimes3));
console.log(findPair(songTimes4));
console.log(findPair(songTimes5));
