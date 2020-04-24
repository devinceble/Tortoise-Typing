/* " Author      : Leivince John Marte
// " Date        : September 2019
// " Version     : 1.0
// " Description : Added Random Words and Languages
*/

const fs = require('fs');
const process = require('process');
const MessagePack = require('what-the-pack');

const { decode } = MessagePack.initialize(2**22); // 4MB

const dataRandom = fs.readFileSync('./words.random');

const randomWords = decode(dataRandom);

const args = process.argv;

let wordList = [];
const wordCount = args[2] || 150
const language = args[3] || "english"
const data = randomWords[language] || randomWords.english;
while (wordList.length < wordCount) {
  const randomWord = data[Math.floor(Math.random() * data.length)];
  if (
    wordList[wordList.length - 1] !== randomWord ||
    wordList[wordList.length - 1] === undefined
  ) {
    wordList.push(randomWord);
  }
}

if (args[4] !== undefined && args[4] === 'punc') {
  if (wordList[0] !== undefined) {
    // Capitalize first word
    wordList[0] = wordList[0][0].toUpperCase() + wordList[0].slice(1);

    // Add comma, fullstop, question mark, exclamation mark, semicolon. Capitalize the next word
    for (i = 0; i < wordList.length; i++) {
      const ran = Math.random();
      if (i < wordList.length - 1) {
        if (ran < 0.03) {
          wordList[i] += ',';
        } else if (ran < 0.05) {
          wordList[i] += '.';
          wordList[i + 1] = wordList[i + 1][0].toUpperCase() + wordList[i + 1].slice(1);
        } else if (ran < 0.06) {
          wordList[i] += '?';
          wordList[i + 1] = wordList[i + 1][0].toUpperCase() + wordList[i + 1].slice(1);
        } else if (ran < 0.07) {
          wordList[i] += '!';
          wordList[i + 1] = wordList[i + 1][0].toUpperCase() + wordList[i + 1].slice(1);
        } else if (ran < 0.08) {
          wordList[i] += ';';
        }
      }
    }
    wordList[wordList.length - 1] += '.';

    // Add quotation marks
  }
}
const writeData = wordList.join(' '); 

// write data to file sample.html
fs.writeFile('/tmp/typings.random',writeData,
    // callback function that is called after writing file is done
    function(err) { 
        if (err) throw err;
        // if no error
        console.log("Data is written to file successfully.")
}); 
