const csv = require('csvtojson');

class Importer {
    constructor() {

    }

    import(path) {
        csv()
            .fromFile('./data/test.csv')
            .then((jsonObj)=>{
                console.log(jsonObj);
            })

    }
}

module.exports.Importer = Importer;
