
import WordExtractor from 'word-extractor';
import { readdir } from 'node:fs/promises'

const dir = "C:/Users/stat2071/lib/Algorithms-data/node-parser/Diffusee";
const extractor = new WordExtractor();

//this function is in charge of reading the directory with all the files 
//we use async because .... await...promise...?
// it takes parameter dirString to simplify calling it with dir defined above
export async function readFilesFromDir(dirString){
    try{
        const files = await readdir(dirString);
        return files;
    }
    catch(err){
        console.log(err);
    }  
}
readFilesFromDir(dir);

//this function reads all the files directory & split files in lines
// it takes a file name and the directory where that file is as parameters
export async function getFileLines(docFileName, pathToDir){
    const fileNameWithDir = pathToDir + "/" + docFileName; 
    const doc = await extractor.extract(fileNameWithDir);
    const docFileLines = doc.getBody().split("\n"); 
    return docFileLines;    
}

//this function extract code, varName, & Description from a file 
// the function takes two arguments. The directory path  & the file 
// the function returns null if the is a file with no varcode in it.
export async function extractDataFromFile(docFileName, dirData){
    const fileLines = await getFileLines(docFileName, dirData);
    const codeLine = fileLines[0];
    if(codeLine == "") {
        throw new Error(`The file ${docFileName} does not have a code`)
    };
    const nameAndCOde = getNameAndCode(codeLine);
    const desCription = getDescription(fileLines, docFileName);
    return {
        "code": nameAndCOde.code, 
        "varname": nameAndCOde.name, 
        "desc": desCription
    };
} 

//this function is in charge of extracting the description from a file where lines are arrays of string
//this function takes fileLines as parameter. The fileLines is an array of strings. 
function getDescription(fileLines, docFileName){
    let descriptionLine = -1;
    for (const element of fileLines.entries()) {
        const lineNumber = element[0];
        const line = element[1];
        if (line === "Description" || line === "Description sommaire") {
            descriptionLine = lineNumber + 2;
            const firstLineOfDescription = fileLines[descriptionLine];
            return firstLineOfDescription;
        }
    }
    throw new Error ("Could not find description for file "+  docFileName);
}

//this function is in charge of extracting the name and the code 
// it takes codeLine as a parameter which is a string. 
// codeLine Is the first line in a file which is an array of strings. 
function getNameAndCode(codeLine){
    const sepVarCodeData = codeLine.split("(");
    const varName= sepVarCodeData[0].trim(); 
    const varCode = sepVarCodeData[1].split(")")[0];
    return {"name": varName, "code": varCode};
}




