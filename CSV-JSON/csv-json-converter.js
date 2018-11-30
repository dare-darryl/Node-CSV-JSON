/*
 *  Written by dare-darryl
 *
 *  The choice to not use only core modules was for the purpose of
 *  getting familiar with the NodeJS environment (as well as JS in general)
 * 
 */

 // Imports
const fs = require('fs');
const path = require('path');
const os = require('os');


const convertCSVToJson = (fileRead = '.\\customer-data.csv', fileWrite = '.\\customer-data.json') => {
    console.log("[OPENING] ", fileRead);

    // Read CSV to csvData
    let csvData;
    try {
        csvData = fs.readFileSync(fileRead, 'utf8', (error, data) => {
            if (error) {
                return console.error("File does not exist");
            }

            return data;
        });
    } catch (e) {
        console.error("File does not exist");
        console.error("Exiting..");
        return;
    }


    console.log("[Writing] ", fileWrite);

    // Split csvData by Line, and then by commas
    let lines = csvData.split(os.EOL);
    let elemVars = lines[0].split(',');

    // Form JSON manually
    let jsonOutput = '[';

    for (var i = 1; i < lines.length; i++) {
        let elems = lines[i].split(',');
        if (elems.length == 1) {
            break;
        }

        // Add a comma to the start of the object if it's not the first object
        if (i != 1) {
            jsonOutput += ',';
        }

        jsonOutput += '{';

        for (var j = 0; j < elemVars.length; j++) {
            // Add a comma before the key (end of last value) if not first key
            if (j != 0) {
                jsonOutput += ',';
            }

            // Write Key
            jsonOutput += '"';
            jsonOutput += elemVars[j];
            jsonOutput += '": "';

            // Write Value
            jsonOutput += elems[j];
            jsonOutput += '"'
        }

        jsonOutput += '}'
    }
    jsonOutput += ']';

    // To validate output. Should be removed in production.
    try {
        let obj = JSON.parse(jsonOutput);
        jsonOutput = JSON.stringify(obj, null, 4);
    } catch (e) {
        console.error('Malformed JSON!');
    }

    // Write to JSON
    fs.writeFileSync(fileWrite, jsonOutput);
}

convertCSVToJson(process.argv[2], process.argv[3]);