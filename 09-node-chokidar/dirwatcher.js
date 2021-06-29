const fs = require('fs');

class DirWatcher {
    constructor() {
    }

    watchChanges(dirname, delay) {
        fs.watch(dirname, (eventType, filename) => { //TODO implement custom `watch` method
            return {
                eventType,
                filename
            };
        });
    }
}

module.exports.DirWatcher = DirWatcher;
