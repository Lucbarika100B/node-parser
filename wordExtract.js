const fs = require('fs'); 
const pdf =  require('pdf-extraction');

let dataBuffer = fs.readFileSync("AIX004.pdf"); 

pdf(dataBuffer).then(function(data){ 

    // try to simplify from line 11 to line 19 & put them in a funtion
    const textToget = []; 

    const getText = textToget.push(data);

    const findText = data.text;

    const lines = findText.split('\n'); 

    const codeLine = lines[2]; 
 
    const sepVarCode = codeLine.split('(');

    const varName = sepVarCode[0];

    const varNameCode = sepVarCode[1].split(')')[0]; 

    const fullVarName = varName.concat(':', varNameCode);

    const lineVarDescTitle = lines[69];

    const lastLineDesc = lines[71];

    const lineVarDesc = lines[70] + ' '+ lastLineDesc.trimEnd();

    const fullVarDesc = lineVarDescTitle.concat(':',  lineVarDesc); 

    const fullData = new Array (fullVarName, lineVarDesc);

    console.log(fullData);
 
})



    //while(lines[line_number])
   // console.log(typeof data);
    //console.log(Object.values(data));
    //console.log(Object.keys(data));
    //console.log(findText.length);
    //const textSearch = "DESCRIPTION";
   //const textIndex = findText.indexOf(textSearch);
    //let line_number = 0;

     //var firstArrayElement = fullData[0];
   // console.log(fullVarName);
  //console.log(fullVarDesc);