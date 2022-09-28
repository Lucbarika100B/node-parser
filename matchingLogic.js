//input => javascript object with 2 keys & values pairs
//output => same object with 1 new key & value pairs
//input comes from testmain.js
//import { getCsvData } from "./testmain.js";
import { createObjectCsvWriter } from 'csv-writer';
import { readFilesFromDir } from "./refactorDocFileExtract.js";
import { outPutDocFiles } from "./docFileExtract.js";
import { getCsvData } from "./testmain.js";
import { extractDataFromFile } from "./refactorDocFileExtract.js";
const DOC_FILE_DIR = "C:/Users/stat2071/lib/Algorithms-data/node-parser/Diffusee";
const CSV_FILE_NAME = "C:/Users/stat2071/lib/Algorithms-data/node-parser/elevePPS01.csv";

//the function finds the possible docs that can match a row
//the role of this function is to find the match one csv row with its matching file data
//the goal is to match one csv row with a DocFile object
//it takes two arguments one csvRow & allDocFilesData list of objects
//THE FUNCTION RETURN AN ARRAY OF OBJECTS : if there is exactly 1 match it returns an array of 1 docFileObject 
//IF there is no match it return an empty & if there is more than 1 match it returns an array of all possible matches
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
  const newCsvRows = [];
  for (const csvRow of csvRows) {
    const docsForRow = possibleDocsForRow(csvRow, docFiles);
    if (docsForRow.length > 1) {
      console.log("There is more than 1 match for this row :", { variable: csvRow.Variable });
      newCsvRows.push({...csvRow, "code": ""});
    } else if (docsForRow.length == 0) {
      console.log("There is No  match for this row :", { variable: csvRow.Variable });
      newCsvRows.push({...csvRow, "code": ""});
    } else {
      newCsvRows.push({ ...csvRow, "code": docsForRow[0].code });
    }
  }
  return newCsvRows;
}


function writeMatches(records) {
  const csvWriter = createObjectCsvWriter({
    path: './outPut.csv',
    header: [
      { id: 'Variable', title: 'VARIABLE' },
      { id: 'Description de la variable', title: 'DESCRIPTION DE LA VARIABLE' },
      { id: 'code', title: 'CODE' }
    ]
  });

  return csvWriter.writeRecords(records)

}
const newCsvRows = (await macthAllCsvRows(CSV_FILE_NAME, DOC_FILE_DIR));
await writeMatches(newCsvRows);