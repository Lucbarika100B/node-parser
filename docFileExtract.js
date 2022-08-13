//import { extractText } from 'office-text-extractor';
import WordExtractor from 'word-extractor';
import { readdir } from 'node:fs/promises'

const dir = "C:/Users/stat2071/lib/Algorithms-data/node-parser/Diffusee";
const files = await readdir(dir);
const extractor = new WordExtractor();
const allDocFilesData = [];



for (const fileName of files) {


  const fileNameWithDir = dir + '/' + fileName;
  const doc = await extractor.extract(fileNameWithDir);

  const text = doc.getBody();

  const lines = text.split("\n");

  const textEntries = lines.entries();

  const codeLine = lines[0];

  if (codeLine === "") continue


  const sepVarCode = codeLine.split('(');
  const varNameCode = sepVarCode[1].split(')')[0];

  let descriptionLine = -1;

  for (const element of textEntries) {
    const lineNumber = element[0];
    const line = element[1];

    if (line === "Description" || line === "Description sommaire") {

      descriptionLine = lineNumber + 2;

      const firstLineOfDescription = lines[descriptionLine];

      const sepVarCodeToString = sepVarCode.toString();

      const docFileDataToJson = ({ Variable: sepVarCode[0], Code: varNameCode, Description: firstLineOfDescription });

      allDocFilesData.push(docFileDataToJson);

    }

  }

}

console.log(JSON.stringify(allDocFilesData));






