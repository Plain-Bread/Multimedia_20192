const { getWordsAttachedTag, toString } = require("./pos_tag");

// Input:
// [
//     { text: 'bị', type: 'V' },
//     { text: 'Chợ', type: 'N' },
//     { text: 'thịt', type: 'N' },
//     { text: 'chó', type: 'N' },
//     { text: 'bị', type: 'V' },
//     { text: 'ăn', type: 'V' },
//     { text: 'chơi', type: 'V' },
//     { text: 'nổi tiếng', type: 'A' },
//     { text: 'ở', type: 'E' },
//     { text: 'bị', type: 'V' },
//     { text: 'Hồ', type: 'Np' },
//     { text: 'Chí', type: 'Np' }
//   ]

// Output:
//   [
//     { text: 'Chợ', type: 'N' },
//     { text: 'thịt', type: 'N' },
//     { text: 'chó', type: 'N' },
//     { text: 'bị', type: 'V' },
//     { text: 'nổi tiếng', type: 'A' },
//     { text: 'ở', type: 'E' },
//     { text: 'bị', type: 'V' },
//     { text: 'ăn', type: 'V' },
//     { text: 'chơi', type: 'V' },
//     { text: 'Hồ', type: 'Np' },
//     { text: 'Chí', type: 'Np' },
//     { text: 'bị', type: 'V' }
//   ]
function toSignLanguage(string) {
  const wordsAttachedTag = getWordsAttachedTag(string);
  let tempVerbs = [];
  let output = [];
  let lastWord = { text: "", type: "" };

  wordsAttachedTag.forEach((word) => {
    if (word.type === "V") {
      if (lastWord.type !== "V") {
        output = output.concat(tempVerbs);
        tempVerbs = [];
      }
      tempVerbs.push(word);
    } else {
      output.push(word);
    }

    lastWord = word;
  });

  output = output.concat(tempVerbs);
  return toString(output);
}

module.exports = { toSignLanguage };
