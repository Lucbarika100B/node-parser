import { extractText } from 'office-text-extractor';
import WordExtractor from 'word-extractor';
import { readdir } from 'node:fs/promises'

//const extractWord  = require("word-extractor"); 
//const extractor = new WordExtractor();
const extracted = await readdir("C:/Users/stat2071/lib/Algorithms-data/node-paser/docTest");

const dir = "C:/Users/stat2071/lib/Algorithms-data/node-paser/docTest";
const files = await readdir(dir); 
const extractor = new WordExtractor(); 

for (const fileName of files) {

  console.log(fileName);
  const fileNameWithDir = dir + '/' + fileName;

extractor.extract(fileNameWithDir).then(function (doc) { 

  const text = doc.getBody();

  const textToGet = [];

  const getText = textToGet.push(text);

  const lines = text.split("\n");

  const codeVarLine = lines[0];

  const textEntries = lines.entries();


  const codeLine = lines[0]; 

    const sepVarCode = codeLine.split('(');

    const varName = sepVarCode[0];

    const varNameCode = sepVarCode[1].split(')')[0]; 

  let descriptionLine = -1;
  
  for (const element of textEntries) {
    const lineNumber = element[0];
    const line = element[1]; 
    //linr 34&35 = const [lineNumber, line] = element; 

    let descriptionEndLine = lines.slice(descriptionLine, lines["\n"]); 

    if (line === "Description" || line === "Description sommaire") {

      descriptionLine = lineNumber + 2;
      const  descriptionComplete = lines.slice(descriptionLine, descriptionEndLine);

      const fullDescription = lines[descriptionLine];

      console.log({varNameCode, varName, descriptionComplete}); 

      }
  
    }
 
  });

}






