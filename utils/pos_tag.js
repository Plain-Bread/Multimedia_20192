const posTag = require("vntk").posTag();

// Input: "Chợ thịt chó nổi tiếng ở TP Hồ Chí Minh bị truy quét";
// Output:
// [
//   { text: 'Chợ', type: 'N' },
//   { text: 'thịt', type: 'N' },
//   { text: 'chó', type: 'N' },
//   { text: 'nổi tiếng', type: 'A' },
//   { text: 'ở', type: 'E' },
//   { text: 'TP', type: 'N' },
//   { text: 'Hồ', type: 'Np' },
//   { text: 'Chí', type: 'Np' },
//   { text: 'Minh', type: 'Np' },
//   { text: 'bị', type: 'V' },
//   { text: 'truy quét', type: 'V' }
// ]
function getWordsAttachedTag(string) {
  return posTag.tag(string).map((element) => {
    return {
      text: element[0],
      type: element[1],
    };
  });
}

function toString(wordsAttachedTag) {
  return wordsAttachedTag
    .filter((word) => {
      return word.type !== "CH";
    })
    .map((word) => {
      return word.text;
    })
    .join(" ")
    .replace("  ", " ");
}

// console.log(
//   getWordsAttachedTag("Chợ thịt chó nổi tiếng ở TP Hồ Chí Minh bị truy quét ,")
// );

module.exports = {
  getWordsAttachedTag,
  toString,
};
