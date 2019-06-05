const fs = require('fs');
const config = require('./config');

log = (msg) => {

    fs.appendFile(config.logFile, msg + '\n', (err) => {
        if (err) {
            throw err;
        }
    })
}

module.exports = {log: log};
