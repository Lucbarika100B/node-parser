const fs = require('fs');
const pdf = require('pdf-extraction');

let dataBuffer = fs.readFileSync("AIX004.pdf");

pdf(dataBuffer).then(function (data) {
    // try to simplify from line 11 to line 19 & put it in a funtion
    const textToget = [];

    const getText = textToget.push(data);

    const findText = data.text;

    const lines = findText.split('\n');

    const codeLine = lines[2];

    const sepVarCode = codeLine.split('(');

    const codeOnly = "("+sepVarCode[1];

    const varName = sepVarCode[0];

    const varNameCode = sepVarCode[1].split(')')[0];

    const fullVarName = varName.concat(':', varNameCode);

    const lineVarDescTitle = lines[69];

    const lastLineDesc = lines[71]+lines[72];

    const lineVarDesc = lines[70] + ' ' + lastLineDesc;

    const fullVarDesc = lineVarDescTitle.concat(':', lineVarDesc);

    const fullData = new Array(fullVarName, lineVarDesc);

    //console.log(fullData);

    console.log({code: codeOnly});
    console.log(fullData);
    //console.log(lines[72])


})


