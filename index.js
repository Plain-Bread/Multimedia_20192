const Excel = require("exceljs");
const workbook = new Excel.Workbook();
const { toSignLanguage } = require("./utils/sign_language");
const { shorten } = require("./utils/stop_words");

const FILE_NAMES = [
  "1. Huyết áp thấp.xlsx",
  "10. Việt Nam hôm nay 21_06 part 3.xlsx",
  "2. Giải mã địa danh trên các tờ tiền Việt Nam.xlsx",
  "3. Làm gì khi cách ly tại nhà.xlsx",
  "4. Hàng giả, hàng nhái.xlsx",
  "5. Cách ly tập trung và cách ly tại nhà.xlsx",
  "6. Những hiểu nhầm về COVID-19.xlsx",
  "7. Sơ cứu khi bị điện giật.xlsx",
  "8. Việt Nam hôm nay 21_06.xlsx",
  "9. Việt Nam hôm nay 21_06 part 2.xlsx",
];

async function shortenCell(fileName, columnIndex, rowIndex) {
  const file = "data/" + fileName;
  let isEdited = true;
  await workbook.xlsx.readFile(file).then(function () {
    const worksheet = workbook.getWorksheet(1);
    const nexColumnIndex = columnIndex + 1;
    const row = worksheet.getRow(rowIndex);

    const currentValue = row.getCell(columnIndex).value;

    if (!currentValue) {
      isEdited = false;
      return workbook.xlsx;
    }

    row.getCell(nexColumnIndex).value = toSignLanguage(shorten(currentValue));

    row.commit();

    return workbook.xlsx.writeFile(file);
  });

  return isEdited;
}

const START_ROW_INDEX = 2;
const COLUMN_INDEX = 2;

async function processFile(fileName) {
  let start = Date.now();

  let rowIndex = START_ROW_INDEX;

  while (true) {
    const isEdited = await shortenCell(fileName, COLUMN_INDEX, rowIndex);
    if (!isEdited) {
      break;
    }
    rowIndex += 1;
  }

  console.log(
    "Done",
    rowIndex - START_ROW_INDEX,
    "records of",
    fileName,
    "after: ",
    Date.now() - start,
    "ms"
  );
}

async function process() {
  let start = Date.now();
  for (const fileName of FILE_NAMES) {
    await processFile(fileName);
  }

  console.log(
    "Done",
    FILE_NAMES.length,
    "file(s)",
    "after: ",
    Date.now() - start,
    "ms"
  );
}

process();
