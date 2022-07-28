const fs = require('fs');
const csv = require('csv-parser');

let data = [];

fs.createReadStream('elevePPS01.csv')
.pipe(csv({separator: ';'}))
.on('data', (rows) => { 
  
   console.log(rows);

})
      

