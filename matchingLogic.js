//input => javascript object with 2 keys & values pairs
//output => same object with 1 new key & value pairs
//input comes from testmain.js
//import { getCsvData } from "./testmain.js";
import { readFilesFromDir } from "./refactorDocFileExtract.js";
import { outPutDocFiles } from "./docFileExtract.js";
import { getCsvData } from "./testmain.js";
import { extractDataFromFile } from "./refactorDocFileExtract.js";
const DOC_FILE_DIR = "C:/Users/stat2071/lib/Algorithms-data/node-parser/Diffusee";
const CSV_FILE_NAME = "C:/Users/stat2071/lib/Algorithms-data/node-parser/elevePPS01.csv";

const firstCsvRow = {
  "Variable": "Année scolaire",
  "Description de la variable": "L’année scolaire désigne la période au cours de laquelle ont lieu les activités d’apprentissage. Elle est représentée par une année de début et une année de fin "
};

//the function finds the possible docs that can match a row
//the role of this function is to find the match one csv row with its matching file data
// the goal is to match one csv row with a DocFile object
//it takes two arguments one csvRow & allDocFilesData list of objects
function possibleDocsForRow(csvRow, allDocFilesData) {
  const arrDocs = [];
  for (const docFileData of allDocFilesData) {
    if (csvRow.Variable === docFileData.varname) {
      arrDocs.push(docFileData);
    }
  }
  return arrDocs;
}

//this function is using the above function possibleDocsForRow
// it uses the above function for finding matches between docs & all csv rows
// we use fileNameData to identify the doc fileName when error occurs
async function macthAllCsvRows(csvFileName, docFileDir) {
  const files = await readFilesFromDir(docFileDir);
  const docFiles = await outPutDocFiles(files, docFileDir);
  const csvRows = await getCsvData(csvFileName);
  const fileNameData = await extractDataFromFile(fileName, dir);
  const newCsvRows = [];
  for (const csvRow of csvRows) {
    const docsForRow = possibleDocsForRow(csvRow, docFiles);
    if (docsForRow.length != 1) {
      console.log(`Unexpected number of matching docs for this row : ${docsForRow}`);
      continue;
    }
    newCsvRows.push({ ...csvRow, "code": docsForRow[0].code });
  }
  return newCsvRows;

}

console.log(await macthAllCsvRows(CSV_FILE_NAME, DOC_FILE_DIR));
