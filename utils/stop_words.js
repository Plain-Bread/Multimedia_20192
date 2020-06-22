const fs = require("fs");

const stopWords = fs
  .readFileSync("./utils/stop_words_vn.txt", "utf-8")
  .split("\n");

function shorten(string) {
  let shortenedString = string
    .replace(".", "")
    .replace(",", "")
    .replace(";", "");
  for (const stopWord of stopWords) {
    shortenedString = shortenedString.split(" " + stopWord + " ").join(" ");
  }

  return shortenedString;
}

module.exports = { stopWords, shorten };
