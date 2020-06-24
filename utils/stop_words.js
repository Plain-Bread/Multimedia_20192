const fs = require("fs");
const { replaceAll, replaceAllCharacters } = require("./common");

const stopWords = fs
  .readFileSync("./utils/stop_words_vn.txt", "utf-8")
  .split("\n");

function shorten(string) {
  let shortenedString = replaceAllCharacters(string, ".,:", "");
  for (const stopWord of stopWords) {
    shortenedString = replaceAll(shortenedString, " " + stopWord + " ", " ");
  }
  return shortenedString;
}

module.exports = { stopWords, shorten };
