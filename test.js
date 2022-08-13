const csvRows =
    [{
        "Variable": "Année scolaire",
        "Description de la variable": "L’année scolaire désigne la période au cours de laquelle ont lieu les activités d’apprentissage.Elle est représentée par une année de début et une année de fin"
    },

    {
        "Variable": "Autorisation pour étudier au Canada",
        "Description de la variable": "L’autorisation pour étudier au Canada fait référence à la condition qui permet à un élève étranger dont le statut légal au Canada est celui de « résident temporaire » ou de « réfugié reconnu » d’étudier au Canada. Ces informations sont disponibles à partir de l'année scolaire 1979-1980."
    },

    {
        "Variable": "Statut de décès",
        "Description de la variable": "Le statut de décès indique que le décès de l’élève est déclaré ou confirmé par un organisme autorisé."
    }];

const jsonTocompare = [{
    "Variable": "Année scolaire ", 
    "Code": "CRM208 ",
    "Description": "L'année scolaire constitue le terme générique désignant les périodes suivantes :"
},

{
    "Variable": "Autorisation pour étudier au Canada",
    "Code": "CRM140",
    "Description": "L’autorisation pour étudier au Canada fait référence à la condition qui permet à un élève étranger dont le statut légal au Canada est celui de « résident temporaire » ou de « réfugié reconnu » d’étudier au Canada."
},

{
    "Variable": "Statut de décès ",
    "Code": "UNE192",
    "Description": "Le statut de décès indique que le décès de l'élève est déclaré ou confirmé par un organisme autorisé. Aucun document officiel n'est exigé pour déclarer le décès d'un élève au Ministère.  Par contre, pour confirmer le décès d'un élève au Ministère, il est obligatoire de fournir le certificat de décès émis par le Directeur de l'état civil comme document officiel."

},

{
    "Variable": " Indicateur de présence d'élèves au 30 septembre ",
    "Code": "UNO095",
    "Description": "L'indicateur de présence d'élève au 30 septembre indique, pour chaque immeuble et chaque installation privée, si l'organisme prévoit y recevoir des élèves au 30 septembre de l'année concernée. Cela concerne les organismes scolaires de l'ordre d'enseignement préscolaire, primaire et secondaire."
},

{
    "Variable": "Indicateur de provenance des valeurs en unitaire ",
    "Code": "DIC403",
    "Description": "L'indicateur de provenance des valeurs en unitaire est utilisé pour déterminer la provenance des valeurs. Si l'indicateur de provenance des valeurs en unitaire est sélectionné, alors les valeurs possibles et les valeurs associées affichées dans la fiche proviennent de l'environnement unitaire sinon elles proviennent de l'environnement courant. Par environnement courant on attend l'environnement ou le DIC est accédé. En temps normale, cet environnement est production. "
}];

//this function purpose is to remove the spaces in the strings variables or Description in docFile Object 
// the parameter allDocfilesData is the array of object that contains all doc files 
function fixDocFileObject(allDocFilesData) {
    for (const file of allDocFilesData) {
        file.Variable = file.Variable.trim();
        file.Description = file.Description;
        file.Description = file.Description.split(".")[0];
        file.Code = file.Code.trim();
    }
    return allDocFilesData;
}

//The function(checkDocFileDataValid) purpose is to make sure there are no undefined values for the data(variable, description or code)
////docFileData is the object that represents one particular docFile, and it has Variable, code, Description keys
function checkDocFileDataValid(docFileData) {
    if (docFileData === undefined) throw new TypeError("DocFileData is undefined")
    if (docFileData.Variable === undefined) throw new TypeError("DocFileData variable undefined")
    if (docFileData.Description === undefined) throw new TypeError("DocFileData description undefined")
}

//docFileData is the object that represents one particular docFile, and it has Variable, code, Description keys
// varNamedesc is the object from the csv with Variable & Description de la variable
// the purpose of this function is to determine if the csv matches the docFile
function doesVariableMatch(docFileData, varNamedesc) {
    checkDocFileDataValid(docFileData);

    if (docFileData.Variable.startsWith(varNamedesc.Variable)) {
        if (docFileData.Description.startsWith(varNamedesc["Description de la variable"])) {
            return true
        } else if (docFileData.Variable.startsWith(varNamedesc.Variable) ||
            docFileData.Description != varNamedesc["Description de la variable"]) {
            return true
        } else return false
    } else return false
}

//this function finds the right code based on matching between Varibale & Description done by function doesVariableMatch
//allFilesData is the array of objects with all doc files objects
// varNamedesc is the object from the csv with Variable & Description de la variable
function findCodeForEntry(allFilesData, varNamedesc) {   
    for (const doc of fixDocFileObject(jsonTocompare)) {
        if (doesVariableMatch(doc, varNamedesc)) {
            return doc.Code
        }
    }
    throw new TypeError(`NO MATCH FOUND for ${JSON.stringify(varNamedesc)}`)
}

//this function print the code in the docFile associated with the proper Variable & Description based on matching 
//varNamedesc is the object with Variable & Description de la variable with correct matching
//We want to print the proper Variable&Description matching the code
function matchCodeToVar() {
    for (const doc of jsonTocompare) {
        checkDocFileDataValid(doc)
    }
    const dataOutput = [];
    for (const row of csvRows) {
        dataOutput.push({ ...row, code: findCodeForEntry(jsonTocompare, row) });
    }
    return dataOutput;
}
console.log(matchCodeToVar());
//console.log(fixDocFileObject(jsonTocompare));
