import { extractDataFromFile, readFilesFromDir } from "./refactorDocFileExtract.js"
import { resolve } from 'node:path';

const dir = "C:/Users/stat2071/lib/Algorithms-data/node-parser/Diffusee";
const files = await readFilesFromDir(dir);

export function outPutDocFiles(files, dir) {
   return new Promise(async (resolve) => {
     const allDocFilesData = [];
      for (const fileName of files) {
         try {
            const fileData = await extractDataFromFile(fileName, dir);
            allDocFilesData.push(fileData);
         } catch (e) {
            console.log(e);
         }
      }
      resolve(allDocFilesData);
   });
} 








