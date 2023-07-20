/* 
Articles = [
  "This is a short article.",
  "Now for a longer article. This one has a lot of text.",
  "Another article with medium length."
]

width = 55
 
 Output:
 
+-------------------------------------------------------+
|This is a short article.                               |
+-------------------------------------------------------+
|Now for a longer article. This one has a lot of text.  |
+-------------------------------------------------------+
|Another article with medium length.                    |
+-------------------------------------------------------+
 
width = 12

+------------+
|This is a   |
|short       |
|article.    |
+------------+
|Now for a   |
|longer      |
|article.    |
|This one has|
|a lot of    |
|text.       |
+------------+
|Another     |
|article with|
|medium      |
|length.     |
+------------+

 */

const processArticles = (articles, width) => {
  lineBreak(width);
  for (let article of articles) {
    // process article
    processArticle(article, width);
    // print line
    lineBreak(width);
  }
};

const processArticle = (article, width) => {
  let line = '|';
  // split into words
  const words = article.split(' ');
  let currentWidth = 1;
  let currentLine = [];
  for (let word of words) {
    if (currentWidth + word.length < width) {
      currentLine.push(word);
      currentWidth += word.length + 1; // add 1 for space
    } else {
      // process line
      processLine(currentLine, width);
      currentWidth = 3 + word.length;
      currentLine = [word];
    }
  }
  if (currentLine.length !== 0) processLine(currentLine, width);
};

const processLine = (line, width) => {
  let output = '|';
  for (let word of line) {
    output += word;
    if (word !== line[line.length - 1]) output += ' ';
  }
  const length = output.length;

  for (let count = 0; count < width - length - 1; count++) {
    output += ' ';
  }
  output += '|';
  console.log(output);
};

const lineBreak = (width) => {
  let line = '+';
  for (let count = 0; count < width - 2; count++) {
    line += '-';
  }
  line += '+';
  console.log(line);
};

const articles = [
  'This is a short article.',
  'Now for a longer article. This one has a lot of text.',
  'Another article with medium length.',
];
const width = 55;

console.log(processArticles(articles, width));
