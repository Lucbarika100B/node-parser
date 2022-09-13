import fs from 'node:fs';
import csv from 'csv-parser';

//this function is responsible to parse a csv file to json
// it takes a csv file as a parameter
export async function getCsvData(csvFileName) {
   return new Promise((resolve) => {
      let dataArr = [];
      fs.createReadStream(csvFileName)
         .pipe(csv({ separator: ';' }))
         .on('data', (rows) => dataArr.push(rows))
         .on('end', () => {
            const dataPromise = resolve(dataArr);
            return dataPromise;
         });
   })
} 




