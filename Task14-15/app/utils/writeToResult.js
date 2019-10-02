const fs = require('fs');

//Method to write data to result.txt
function writeToResult(message) {
    return fs.appendFile("result.txt", message, (error) => {
        if (error) {
            console.log(`Something goes wrong`);
            throw error;
        }})
}

module.exports = writeToResult;