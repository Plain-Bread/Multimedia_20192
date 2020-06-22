const Excel = require("exceljs");
const workbook = new Excel.Workbook();

const { array } = require("./utils/common");
const { toSignLanguage } = require("./utils/sign_language");

const { shorten } = require("./utils/stop_words");

const FILE_NAME = "data/" + "Hàng giả, hàng nhái" + ".xlsx";

async function shortenCell(fileName, columnIndex, rowIndex) {
  let isEdited = true;
  await workbook.xlsx.readFile(fileName).then(function () {
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

    return workbook.xlsx.writeFile(fileName);
  });

  return isEdited;
}

const START_ROW_INDEX = 2
const COLUMN_INDEX = 2

async function process() {
  let start = Date.now();

  let rowIndex = START_ROW_INDEX;

  while (true) {
    const isEdited = await shortenCell(FILE_NAME, COLUMN_INDEX, rowIndex);
    if (!isEdited) {
      break;
    }
    rowIndex += 1;
  }

  console.log(
    "Done",
    rowIndex - START_ROW_INDEX,
    "records after: ",
    Date.now() - start,
    "ms"
  );
}

process();
