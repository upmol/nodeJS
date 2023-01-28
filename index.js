const fs = require('fs');
const ACCESS_LOG = './access.log';
const fsPromises = require('fs/promises');
const rl = require('readline');
const filteredBy = [
    '89.123.1.41',
    '34.48.240.111'
];
let writeStream = [];

const file = rl.createInterface({
        input: fs.createReadStream( ACCESS_LOG ),
        });

for (let i = 0; i < filteredBy.length; i++ ) {
    writeStream[filteredBy[i]] = fs.createWriteStream(
        'access_filtered_by_' + filteredBy[i] + '.log',
        {
            encoding: 'utf-8',
            flags: 'a',
        }
    );
};

file.on('line', (input) => {
    for (let i = 0; i < filteredBy.length; i++ ) {
        if (input.indexOf(filteredBy[i]) !== -1) writeFile(filteredBy[i], input);
    }
   
});

file.on('error', (err) => {
    console.log(err);
});

const writeFile = (stream, logString) => {
    writeStream[stream].write(logString + '\n');
};
