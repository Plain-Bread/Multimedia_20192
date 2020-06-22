const Excel = require("exceljs");

const workbook = new Excel.Workbook();

const FILE_NAME = "data2/" + "Huyết áp thấp" + ".xlsx";

let paragraph = [];

async function getValue(fileName, columnIndex, rowIndex) {
  let value = "";
  await workbook.xlsx.readFile(fileName).then(function () {
    const worksheet = workbook.getWorksheet(1);
    const row = worksheet.getRow(rowIndex);
    value = row.getCell(columnIndex).value.replace("\n", "");
  });

  console.log("Process: Column " + columnIndex + " row " + rowIndex);
  return value;
}

function array(from, to) {
  return Array.from(Array(to - from + 1), (_, i) => i + from);
}

async function getParagraph() {
  let dict = {};
  await Promise.all(
    array(2, 63).map(async (index) => {
      dict[index] = await getValue(FILE_NAME, 2, index);
    })
  );

  for (const key in dict) {
    paragraph.push(dict[key]);
  }
}

async function process() {
  let start = Date.now();
  await getParagraph();
  console.log("Sentence 1: ");
  const sentence = paragraph[1];
  for (const word of sentence.split(" ")) {
    const tf = getTf(word, sentence);
    const idf = getIdf(word, paragraph);
    console.log("Word ", word, ":", tf * idf);
  }
  console.log("Done after: ", Date.now() - start, "ms");
}

function getTf(word, sentence) {
  let count = 0;
  for (const w of sentence.split(" ")) {
    if (w.toLowerCase() === word.toLowerCase()) {
      count += 1;
    }
  }

  return count / sentence.split(" ").length;
}

function getIdf(word, paragraph) {
  let paragraphContainsWordCount = 0;

  for (const sentence of paragraph) {
    if (sentence.toLowerCase().includes(word.toLowerCase())) {
      paragraphContainsWordCount += 1;
    }
  }

  return Math.log(paragraph.length / paragraphContainsWordCount);
}

process();
// console.log("123456".replace("123", ""));
