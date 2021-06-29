const dirwatcher = require('./dirwatcher');
const importer = require('./importer');
const fs = require('fs');
const csv = require('csvtojson');

const readFiles = []
const getDirContents = async () => {
    // fs.readdir('./data', (err, files) => {
    //     return files;
    // });
    fs.readdir('./data', function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            // console.log(file);
        });
    });
}

const readInitialFiles = async () => {
    await getDirContents();
    console.log(readFiles);
}

readInitialFiles();
// const readFiles = getDirContents();

fs.watch('./data', (eventType, filename) => { //TODO implement custom `watch` method
    files.push({
        eventType,
        filename
    });
});

csv()
    .fromFile('./data/test.csv')
    .then((jsonObj)=>{
        console.log(jsonObj);
    })
